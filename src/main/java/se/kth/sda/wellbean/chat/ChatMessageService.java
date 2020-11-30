package se.kth.sda.wellbean.chat;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatMessageService {
    private ChatMessageRepository chatMessageRepository;
    private ChatRoomService chatRoomService;

    public ChatMessage save(ChatMessage chatMessage) {
        chatMessage.setStatus(MessageStatus.RECEIVED);
        return chatMessageRepository.save(chatMessage);
    }

    public long countNewMessages(String senderId, String recipientId) {
        return chatMessageRepository.countBySenderIdAndRecipientIdAndStatus(senderId, recipientId, MessageStatus.RECEIVED);
    }

    public List<ChatMessage> findChatMessages(String senderId, String recipientId) {
        var chatId = chatRoomService.getChatId(senderId, recipientId, false);

        var messages = chatId
                .map(cId -> chatMessageRepository.findByChatId(cId))
                .orElse(new ArrayList<>());

        if(messages.size() > 0) {
            updateStatuses(messages, senderId, recipientId, MessageStatus.DELIVERED);
        }

        return messages;

    }

    public void updateStatuses(List<ChatMessage> messages, String senderId, String recipientId, MessageStatus status) {
        List<ChatMessage> updatedMessages = new ArrayList<>();
        for (ChatMessage message:
             messages) {
            message.setStatus(status);
            updatedMessages.add(message);
            chatMessageRepository.save(message);
        }
    }

    public ChatMessage findById(String id) {
        return chatMessageRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("can't find message (" + id + ")")
        );
    }
}
