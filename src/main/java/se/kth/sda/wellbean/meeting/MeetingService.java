package se.kth.sda.wellbean.meeting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.kth.sda.wellbean.user.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
public class MeetingService {
    @Autowired
    private MeetingRepository meetingRepository;

    public Meeting addMeeting(Meeting meeting) {
        return meetingRepository.save(meeting);
    }
    public Meeting getMeeting(Long id) {
        return meetingRepository.getById(id);
    }
    public List<Meeting> getMeetingByUserId(Long userId) {
        return meetingRepository.getAllByHostIdAndStartTimeIsAfter(userId, LocalDateTime.now());
    }
    /*public List<Meeting> getMeetingByUsersId(Long userId) {
        return meetingRepository.findAllByUsers_idAndStartTimeIsAfter(userId, LocalDateTime.now());
    }*/

    public void deleteMeeting(Long id) {
        meetingRepository.deleteById(id);
    }

    public Meeting updateMeeting(Meeting currentMeeting) {
         return meetingRepository.save(currentMeeting);
    }
}
