package se.kth.sda.wellbean.chat;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    public ChatRoomService(ChatRoomRepository chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }

    public Optional<String> getChatId(Long senderId, Long recipientId,
                                      boolean createIfNotExist) {
        System.out.println("Inside getChatId");
        return chatRoomRepository
                .findBySenderIdAndRecipientId(senderId, recipientId)
                .map(chatRoom -> {
                    return chatRoom.getChatId();
                })
                    .or(() -> {
                        System.out.println("Crete if not exist");
                        if(!createIfNotExist) {
                            return Optional.empty();
                        }
                        String chatId = String.format("%d_%d", senderId, recipientId);
                        System.out.println("Chat id = " + chatId);

                        ChatRoom senderRecipient = new ChatRoom();
                        senderRecipient.setChatId(chatId);
                        senderRecipient.setSenderId(senderId);
                        senderRecipient.setRecipientId(recipientId);

                        ChatRoom recipientSender = new ChatRoom();
                        recipientSender.setChatId(chatId);
                        recipientSender.setSenderId(recipientId);
                        recipientSender.setRecipientId(senderId);

                        System.out.println("senderRecipient" + senderRecipient.getChatId());
                        System.out.println("recipientSender" + recipientSender.getChatId());

                        chatRoomRepository.save(senderRecipient);
                        chatRoomRepository.save(recipientSender);

                        return Optional.of(chatId);
                    });
    }
}
