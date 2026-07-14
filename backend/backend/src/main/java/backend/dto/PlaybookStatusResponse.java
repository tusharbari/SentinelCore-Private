package backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlaybookStatusResponse {

    private Long incidentId;
    private String status;
    private String currentStep;
    private int progress;

}