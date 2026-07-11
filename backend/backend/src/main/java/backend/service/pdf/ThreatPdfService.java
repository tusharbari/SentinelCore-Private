package backend.service.pdf;

import backend.entity.Threat;
import backend.repository.ThreatRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class ThreatPdfService {

    @Autowired
    private ThreatRepository threatRepository;

    public ByteArrayInputStream generatePdf() {

        Document document = new Document();

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {

            PdfWriter.getInstance(document, out);

            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20);

            Paragraph title = new Paragraph("SentinelCore Threat Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);

            document.add(title);
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Generated Automatically"));
            document.add(new Paragraph(" "));

            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);

            table.addCell("ID");
            table.addCell("Title");
            table.addCell("Severity");
            table.addCell("Source");
            table.addCell("Status");

            List<Threat> threats = threatRepository.findAll();

            for (Threat threat : threats) {

                table.addCell(String.valueOf(threat.getId()));
                table.addCell(threat.getTitle());
                table.addCell(threat.getSeverity());
                table.addCell(threat.getSource());
                table.addCell(threat.getStatus());

            }

            document.add(table);

            document.close();

        } catch (Exception e) {

            e.printStackTrace();

        }

        return new ByteArrayInputStream(out.toByteArray());

    }

}