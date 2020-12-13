package se.kth.sda.wellbean.chat;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
    long countBySenderIdAndRecipientIdAndStatus(Long senderId, Long recipientId,
                                                MessageStatus status);

    List<ChatMessage> findByChatId(String chatId);
}
