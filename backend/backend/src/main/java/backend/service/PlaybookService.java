package backend.service;

import backend.dto.PlaybookStatusResponse;
import backend.entity.PlaybookExecution;
import backend.repository.PlaybookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlaybookService {

    private final PlaybookRepository repository;

    public PlaybookStatusResponse runPlaybook(Long incidentId){

        PlaybookExecution playbook = new PlaybookExecution();

        playbook.setIncidentId(incidentId);
        playbook.setPlaybookName("Malware Response");
        playbook.setCurrentStep("Collect Logs");
        playbook.setStatus("RUNNING");
        playbook.setProgress(20);

        repository.save(playbook);

        return new PlaybookStatusResponse(
                incidentId,
                playbook.getStatus(),
                playbook.getCurrentStep(),
                playbook.getProgress()
        );

    }

    public PlaybookStatusResponse updateStatus(Long incidentId){

        PlaybookExecution playbook =
                repository.findByIncidentId(incidentId).orElseThrow();

        switch (playbook.getProgress()){

            case 20:
                playbook.setCurrentStep("Host Isolation");
                playbook.setProgress(60);
                break;

            case 60:
                playbook.setCurrentStep("Block Malicious IP");
                playbook.setProgress(80);
                break;

            case 80:
                playbook.setCurrentStep("Notify SOC Team");
                playbook.setProgress(100);
                playbook.setStatus("COMPLETED");
                break;
        }

        repository.save(playbook);

        return new PlaybookStatusResponse(
                incidentId,
                playbook.getStatus(),
                playbook.getCurrentStep(),
                playbook.getProgress()
        );
    }

}