package se.kth.sda.wellbean.calendar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/")
public class CalendarController {

    @GetMapping("/")
    public ModelAndView calendar() {
        ModelAndView modelAndView = new ModelAndView("calendar");
        return modelAndView;
    }
}
