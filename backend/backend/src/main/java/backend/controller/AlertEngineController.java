package backend.controller;

import backend.dto.SecurityEvent;
import backend.service.AlertEngineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/alert-engine")
@CrossOrigin(origins = "http://localhost:5173")
public class AlertEngineController {

    private final AlertEngineService alertEngineService;

    public AlertEngineController(AlertEngineService alertEngineService) {
        this.alertEngineService = alertEngineService;
    }

    @PostMapping("/process")
    public ResponseEntity<String> processEvent(@RequestBody SecurityEvent event) {

        alertEngineService.processEvent(event);

        return ResponseEntity.ok("Security event processed successfully.");
    }
}