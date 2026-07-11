package backend.controller;

import backend.service.excel.ThreatExcelService;
import backend.service.pdf.ThreatPdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class ReportController {

    @Autowired
    private ThreatPdfService threatPdfService;

    @Autowired
    private ThreatExcelService threatExcelService;

    // ================= PDF Report =================

    @GetMapping("/threats/pdf")
    public ResponseEntity<InputStreamResource> exportThreatPdf() {

        HttpHeaders headers = new HttpHeaders();

        headers.add(
                HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=SentinelCore_Threat_Report.pdf"
        );

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(
                        threatPdfService.generatePdf()
                ));
    }

    // ================= Excel Report =================

    @GetMapping("/threats/excel")
    public ResponseEntity<InputStreamResource> exportThreatExcel()
            throws IOException {

        HttpHeaders headers = new HttpHeaders();

        headers.add(
                HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=SentinelCore_Threat_Report.xlsx"
        );

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(new InputStreamResource(
                        threatExcelService.generateExcel()
                ));
    }
}