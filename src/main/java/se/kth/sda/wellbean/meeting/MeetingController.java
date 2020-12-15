package se.kth.sda.wellbean.meeting;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import org.springframework.web.bind.annotation.*;

import com.mashape.unirest.http.*;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONArray;
import org.json.JSONObject;
import se.kth.sda.wellbean.auth.AuthService;
import se.kth.sda.wellbean.bean.BeanService;
import se.kth.sda.wellbean.calendar.Event;
import se.kth.sda.wellbean.calendar.EventService;
import se.kth.sda.wellbean.project.ProjectService;
import se.kth.sda.wellbean.user.User;
import se.kth.sda.wellbean.user.UserService;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@RestController
public class MeetingController {

    String jwtToken;
    private  JWTTokenZoomAPI jwtTokenZoomAPI = new JWTTokenZoomAPI();
    private final MeetingService meetingService;
    private final UserService userService;
    private final AuthService authService;
    private  final EventService eventService;


    public  MeetingController ( MeetingService meetingService,
                             UserService userService,
                             AuthService authService,
                                EventService eventService) {
        this.meetingService = meetingService;
        this.userService = userService;
        this.eventService = eventService;
        this.authService = authService;
    }

    @GetMapping("/meeting")
    public List<Meeting> getMeetings() {
        List<Meeting> meetings = new ArrayList<>();
        List<Event> userEvents = eventService.findAllByUserId(getUser().getId());
        for ( Event event: userEvents) {
            if(event.getMeeting() != null) {
                meetings.add(event.getMeeting());
            }
        }
        return meetings;
    }

    @GetMapping("/meeting/members/{id}")
    public List<User> getMeetingMembers(@PathVariable Long id) {
        Event meetingEvent = eventService.getEventByMeetingId(id);
        return (List<User>) meetingEvent.getUsers();
    }
    @DeleteMapping ("/meeting/{id}")
    public void deleteMeeting(@PathVariable Long id) {
         meetingService.deleteMeeting(id);
         eventService.deleteEventsByMeetingId(id);
    }
    @PutMapping("/meeting/addMembers/{id}")
    public void addMembers(@RequestBody String[] userEmails, @PathVariable Long id) {
        Event currentEvent= eventService.getEventByMeetingId(id);
        currentEvent.setUsers(null);
        User user;
        for (String email: userEmails) {
            user = userService.findUserByEmail(email);
            currentEvent.addMember(user);
        }
        currentEvent.addMember(getUser());
        eventService.update(currentEvent);
    }
    @PostMapping("/meeting")
    public Meeting createMeeting(@RequestBody Meeting meetingDetails) {
        String userid = getUserId();
        ObjectMapper mapper = new ObjectMapper();
        ObjectReader reader = mapper.reader();
        String jsonBodyString ="";
        if(meetingDetails.getType() == 1) {
            jsonBodyString = "{\"topic\": \"Quick Meeting\"," +
                    "\"type\": 1," +
                    "\"password\": \"Hey123\"," ;

        }
        if(meetingDetails.getType() == 2) {
            meetingDetails.setStartTime(meetingDetails.getStartTime().plusMinutes(60));
            jsonBodyString = "{\"topic\": \"" + meetingDetails.getTopic()+ "\"," +
                    "\"type\": " + meetingDetails.getType() + "," +
                    "\"start_time\": \"" + meetingDetails.getStartTime()+ "\"," +
                    "\"timezone\": \"Europe/Stockholm\"," +
                    "\"duration\": \"" + meetingDetails.getDuration()+ "\"," +
                    "\"password\": \"" +  meetingDetails.getPassword() + "\"," +
                    "\"agenda\": \"" + meetingDetails.getAgenda() + "\",";

        }

        jsonBodyString = jsonBodyString + "\"settings\" : {\"host_video\" : \"true\"," +
                "\"mute_upon_entry\": true," +
                "\"approval_type\": 0," +
                "\"participant_video\" : \"true\"," +
                "\"join_before_host\" : \"true\" }}";

        String posturl= "https://api.zoom.us/v2/users/" + userid + "/meetings";
        try {
            com.fasterxml.jackson.databind.JsonNode node = reader.readTree(jsonBodyString);
            System.out.println(node.toString());
            HttpResponse<com.mashape.unirest.http.JsonNode> response2 = Unirest.post(posturl)
                    .header("content-type", "application/json")
                    .header("authorization", "Bearer "+jwtToken)
                    .body(String.valueOf(node))
                    .asJson();
            JSONObject meetingObject= (JSONObject) response2.getBody().getArray().get(0);
            meetingDetails.setHost(getUser());
            meetingDetails.setStart_url(meetingObject.get("start_url").toString());
            meetingDetails.setJoin_url(meetingObject.get("join_url").toString());
            if(meetingDetails.getType() == 2) {
                meetingDetails=  meetingService.addMeeting(meetingDetails);
                createMeetingEvent(meetingDetails);
            }
        } catch (JsonProcessingException | UnirestException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return meetingDetails;
    }

    @PostMapping("/meeting/add")
    public void addMembers() {

    }

    private void setJWTToken() {
        jwtToken = jwtTokenZoomAPI.getJWTToken();
    }

    private String getUserId() {
        setJWTToken();
        HttpResponse<JsonNode> response = null;
        try {
            response = Unirest.get("https://api.zoom.us/v2/users?status=active&page_size=30&page_number=1")
                    .header("content-type", "application/json")
                    .header("authorization", "Bearer "+jwtToken).asJson();
        } catch (UnirestException e) {
            e.printStackTrace();
        }
        JSONObject responseobjet= (JSONObject) response.getBody().getArray().get(0);
        JSONArray userarray = (JSONArray) responseobjet.get("users");
        JSONObject user = (JSONObject) userarray.get(0);
        String userid= user.get("id").toString();
        return userid;
    }
    private User getUser() {
        return userService.findUserByEmail(authService.getLoggedInUserEmail());
    }

    private LocalDateTime parseDate(String dateString) {
        Date date = null;
        SimpleDateFormat inputDateFormat=new SimpleDateFormat("yyyy-MM-ddHH:MM");

        try {
            date = inputDateFormat.parse(dateString);
        } catch (ParseException e) {

        }

        LocalDateTime localDate = LocalDateTime.ofInstant(date.toInstant(),
                ZoneId.systemDefault());

        return localDate;
    }
    private void createMeetingEvent(Meeting meeting) {
        Event createEvent = new Event();
        createEvent.setTitle(meeting.getTopic());
        createEvent.setDescription(meeting.getAgenda());
        createEvent.setStart(meeting.getStartTime());
        createEvent.setEnd(meeting.getStartTime().plusMinutes(meeting.getDuration()));
        createEvent.addMember(getUser());
        createEvent.setCreator(meeting.getHost());
        createEvent.setMeeting(meeting);
        eventService.create(createEvent);

    }
}
