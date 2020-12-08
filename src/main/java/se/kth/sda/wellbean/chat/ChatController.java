package se.kth.sda.wellbean.chat;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import se.kth.sda.wellbean.auth.AuthService;
import se.kth.sda.wellbean.project.ProjectService;
import se.kth.sda.wellbean.user.User;
import se.kth.sda.wellbean.user.UserRepository;
import se.kth.sda.wellbean.user.UserService;

@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMessageService chatMessageService;
    private final ChatRoomService chatRoomService;
    private final AuthService authService;
    private final UserService userService;
    private final ProjectService projectService;

    public ChatController(SimpMessagingTemplate messagingTemplate,
                          ChatMessageService chatMessageService,
                          ChatRoomService chatRoomService,
                          AuthService authService,
                          UserService userService,
                          ProjectService projectService) {
        this.messagingTemplate = messagingTemplate;
        this.chatMessageService = chatMessageService;
        this.chatRoomService = chatRoomService;
        this.authService = authService;
        this.userService = userService;
        this.projectService = projectService;
    }

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessage chatMessage) {
        var chatId = chatRoomService
                    .getChatId(chatMessage.getSenderId(),
                            chatMessage.getRecipientId(),
                true);
        chatMessage.setChatId(chatId.get());

        String recipientName = userService.findById(chatMessage.getRecipientId()).getName();

        chatMessage.setRecipientName(recipientName);

        ChatMessage saved = chatMessageService.save(chatMessage);

        messagingTemplate.convertAndSendToUser(chatMessage.getRecipientName(),
                "/queue/messages",
                new ChatNotification(
                        saved.getId(),
                        saved.getSenderId(),
                        saved.getSenderName()
                ));
    }

    @MessageMapping("/chat/general/")
    public void processProjectMessage(@Payload ChatMessage chatMessage) {

        Long projectId = chatMessage.getRecipientId();
        var chatId = chatRoomService
                .getChatId(projectId.toString(),
                        true);
        chatMessage.setChatId(chatId.get());

        chatMessage.setRecipientId(projectId);

        String recipientName = projectService.getById(projectId).getTitle();

        chatMessage.setRecipientName(recipientName);

        ChatMessage saved = chatMessageService.save(chatMessage);

        messagingTemplate.convertAndSendToUser(chatMessage.getRecipientName(),
                "/queue/messages",
                new ChatNotification(
                        saved.getId(),
                        saved.getSenderId(),
                        saved.getSenderName()
                ));
    }

    @GetMapping("/messages/{senderId}/count")
    public ResponseEntity<Long> countNewMessages(@PathVariable Long senderId) {
        Long recipientId = getLoggedInUser().getId();
        return ResponseEntity
                .ok(chatMessageService.countNewMessages(senderId, recipientId));
    }

    @GetMapping("/messages/{senderId}")
    public ResponseEntity<?> findChatMessages(@PathVariable Long senderId) {
        Long recipientId = getLoggedInUser().getId();
        return ResponseEntity
                .ok(chatMessageService.findChatMessages(senderId, recipientId));
    }

    @GetMapping("/messages/findMessage/{id}")
    public ResponseEntity<?> findMessage(@PathVariable String id) {
        return ResponseEntity
                .ok(chatMessageService.findById(id));
    }

    @GetMapping("/messages/project/{projectId}")
    public ResponseEntity<?> findProjectMessages(@PathVariable String projectId) {
        return ResponseEntity
                .ok(chatMessageService.findProjectMessages(projectId));
    }

    private User getLoggedInUser () {
        String email = authService.getLoggedInUserEmail();
        return userService.findUserByEmail(email);
    }

}
