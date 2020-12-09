package se.kth.sda.wellbean.bean;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BeanService {
    @Autowired
    private BeanRepository beanRepository;
    @Autowired
    private BeansPreSetRepository beansPreSetRepository;


    public List<Bean> findAllByUserId(Long userId) {
           return beanRepository.getAllByCreatedDateAndUserId(LocalDate.now(),userId);
    }
    public Bean createNewBean(Bean newBean) {
        return beanRepository.save(newBean);
    }
    public Bean updateBean(Bean updatedBean) {
        return beanRepository.save(updatedBean);
    }
    public void deleteBean(long id) {
         beanRepository.deleteById(id);
    }


    public List<BeansPreSet> getBeansPreSet() {
        return beansPreSetRepository.findAll();
    }
    public BeansPreSet getBeanPreSetDetailsById(Long id) {
        return beansPreSetRepository.findById(id).orElseThrow();
    }

    public Optional<Bean> findByBeanId(Long beanId) {
        return beanRepository.findById(beanId);
    }
}
