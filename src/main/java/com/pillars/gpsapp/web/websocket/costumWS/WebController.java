package com.pillars.gpsapp.web.websocket.costumWS;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebController {

    @MessageMapping("topic/hello")
    @SendTo("/topic/hi")
    public String greeting(String user) throws Exception {
        return "hello user";
    }
}
