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
        populatePreSettable();
        return beansPreSetRepository.findAll();
    }
    public BeansPreSet getBeanPreSetDetailsById(Long id) {
        return beansPreSetRepository.findById(id).orElseThrow();
    }

    public Optional<Bean> findByBeanId(Long beanId) {
        return beanRepository.findById(beanId);
    }

    //To populate beanpreset table data
    private void populatePreSettable() {
        List<BeansPreSet> beansPreSetList = beansPreSetRepository.findAll();
        if(beansPreSetList.size() == 0) {
            beansPreSetRepository.save(new BeansPreSet("Drink a glass of water every 1 hour",8,"Keep hydrated",0));
            beansPreSetRepository.save(new BeansPreSet("Eat your meal on time",4,"Eat on time",30));
            beansPreSetRepository.save(new BeansPreSet("Exercise 30 minutes",1,"Exercise",30));
            beansPreSetRepository.save(new BeansPreSet("Be with yourself for 30 minutes",1,"Meditation",30));
        }
        }

}
