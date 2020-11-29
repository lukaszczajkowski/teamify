package se.kth.sda.wellbean.chat;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    public ChatRoomService(ChatRoomRepository chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }

    public Optional<String> getChatId(String senderId, String recipientId,
                                    boolean createIfNotExist) {
        return chatRoomRepository
                .findBySenderIdAndRecipientId(senderId, recipientId)
                .map(ChatRoom::getChatId)
                    .or(() -> {
                        if(!createIfNotExist) {
                            return Optional.empty();
                        }
                        var chatId = String.format("%s_%s", senderId, recipientId);
                        ChatRoom senderRecipient = new ChatRoom();
                        senderRecipient.setChatId(chatId);
                        senderRecipient.setSenderId(senderId);
                        senderRecipient.setRecipientId(recipientId);

                        ChatRoom recipientSender = new ChatRoom();
                        recipientSender.setChatId(chatId);
                        recipientSender.setSenderId(recipientId);
                        recipientSender.setRecipientId(senderId);

                        chatRoomRepository.save(senderRecipient);
                        chatRoomRepository.save(recipientSender);

                        return Optional.of(chatId);
                    });
    }
}
