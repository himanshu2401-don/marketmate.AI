import { jsPDF } from 'jspdf';
import { CampaignPlan } from '../types';

/**
 * Helper to generate a clean URL/filename-friendly slug
 */
const getSlug = (name: string) => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'marketmate-campaign';
};

/**
 * 1. Export as a high-fidelity formatted PDF Report (.pdf)
 */
export const exportCampaignToPDF = (plan: CampaignPlan) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let currentY = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - margin) {
      doc.addPage();
      currentY = margin;
      drawPageHeader();
    }
  };

  const drawPageHeader = () => {
    // Subtle top running header on page > 1
    if (doc.getNumberOfPages() > 1) {
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 160);
      doc.text(`MarketMate.AI — ${plan.businessName} Campaign Strategy`, margin, 10);
      doc.setDrawColor(230, 230, 240);
      doc.line(margin, 12, pageWidth - margin, 12);
      currentY = 16;
    }
  };

  // --- Title & Cover Header ---
  // Top purple accent bar
  doc.setFillColor(113, 56, 216); // #7138D8
  doc.rect(margin, currentY, contentWidth, 3, 'F');
  currentY += 8;

  // MarketMate.AI Sub-brand
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(113, 56, 216);
  doc.text('MARKETMATE.AI // MARKETING ENGINE', margin, currentY);
  currentY += 7;

  // Main Campaign Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(33, 17, 61); // #21113D
  const titleLines = doc.splitTextToSize(`Marketing Strategy: ${plan.businessName}`, contentWidth);
  doc.text(titleLines, margin, currentY);
  currentY += titleLines.length * 8 + 2;

  // Meta details bar
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 110);
  const dateStr = new Date(plan.createdAt).toLocaleDateString();
  const platformStr = plan.platform ? `Platform: ${plan.platform}` : 'Multi-Channel';
  const toneStr = plan.campaignTone ? `Tone: ${plan.campaignTone}` : 'Strategic';
  doc.text(`Generated: ${dateStr}  |  ${platformStr}  |  ${toneStr}`, margin, currentY);
  currentY += 8;

  // Divider line
  doc.setDrawColor(220, 220, 235);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 8;

  // --- Reusable Section Printer ---
  const printSectionHeader = (number: string, title: string) => {
    checkPageBreak(14);
    doc.setFillColor(248, 246, 255); // #F8F6FF
    doc.roundedRect(margin, currentY, contentWidth, 8, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(113, 56, 216);
    doc.text(`${number}. ${title}`, margin + 3, currentY + 5.5);
    currentY += 12;
  };

  const printParagraph = (text: string, color: [number, number, number] = [40, 40, 50]) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, contentWidth);
    checkPageBreak(lines.length * 5 + 3);
    doc.text(lines, margin, currentY);
    currentY += lines.length * 5 + 4;
  };

  const printBulletList = (items: string[]) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(45, 45, 55);
    items.forEach((item, idx) => {
      const text = `${idx + 1}. ${item}`;
      const lines = doc.splitTextToSize(text, contentWidth - 4);
      checkPageBreak(lines.length * 4.8 + 2);
      doc.text(lines, margin + 2, currentY);
      currentY += lines.length * 4.8 + 2;
    });
    currentY += 3;
  };

  // 1. Overview
  printSectionHeader('01', 'Executive Campaign Overview');
  printParagraph(plan.overview);

  // 2. Audience Insights
  printSectionHeader('02', 'Target Audience Insights');
  printParagraph(plan.audienceInsights);

  // 3. USP
  printSectionHeader('03', 'Unique Selling Proposition (USP)');
  // Callout box for USP
  checkPageBreak(18);
  doc.setFillColor(250, 248, 255);
  doc.setDrawColor(184, 160, 255);
  doc.roundedRect(margin, currentY, contentWidth, 14, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(113, 56, 216);
  const uspLines = doc.splitTextToSize(`"${plan.usp}"`, contentWidth - 8);
  doc.text(uspLines, margin + 4, currentY + 6);
  currentY += 18;

  // 4. Theme & Slogan
  printSectionHeader('04', 'Campaign Theme & Slogan');
  printParagraph(`Primary Theme: ${plan.themeAndSlogan.theme}`);
  printParagraph(`Brand Slogan: "${plan.themeAndSlogan.slogan}"`);

  // 5. Content Ideas
  printSectionHeader('05', 'Social Media Content Concepts');
  printBulletList(plan.contentIdeas);

  // 6. Social Captions
  printSectionHeader('06', 'Ready-to-Use Social Captions');
  plan.captions.forEach((cap, i) => {
    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(113, 56, 216);
    doc.text(`Caption Option 0${i + 1}`, margin, currentY);
    currentY += 5;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(33, 17, 61);
    doc.text(`Hook: `, margin, currentY);
    doc.setFont('helvetica', 'normal');
    const hookLines = doc.splitTextToSize(cap.hook, contentWidth - 16);
    doc.text(hookLines, margin + 14, currentY);
    currentY += hookLines.length * 4.5 + 2;

    doc.setFont('helvetica', 'bold');
    doc.text(`Body: `, margin, currentY);
    doc.setFont('helvetica', 'normal');
    const bodyLines = doc.splitTextToSize(cap.body, contentWidth - 16);
    doc.text(bodyLines, margin + 14, currentY);
    currentY += bodyLines.length * 4.5 + 2;

    doc.setFont('helvetica', 'bold');
    doc.text(`CTA: `, margin, currentY);
    doc.setFont('helvetica', 'normal');
    const ctaLines = doc.splitTextToSize(cap.callToAction, contentWidth - 16);
    doc.text(ctaLines, margin + 14, currentY);
    currentY += ctaLines.length * 4.5 + 6;
  });

  // 7. Hashtags
  printSectionHeader('07', 'Curated Hashtag Clusters');
  printParagraph(plan.hashtags.join(' '));

  // 8. Content Calendar
  printSectionHeader('08', '7-Day Strategic Content Calendar');
  // Table headers
  checkPageBreak(12);
  doc.setFillColor(33, 17, 61);
  doc.rect(margin, currentY, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('Day / Cadence', margin + 3, currentY + 5);
  doc.text('Content Focus', margin + 45, currentY + 5);
  doc.text('Platform / Format', margin + 125, currentY + 5);
  currentY += 8;

  // Table rows
  plan.contentCalendar.forEach((item, idx) => {
    const rowColor = idx % 2 === 0 ? 255 : 248;
    const focusLines = doc.splitTextToSize(item.contentFocus, 75);
    const rowHeight = Math.max(7, focusLines.length * 4 + 3);
    checkPageBreak(rowHeight);

    doc.setFillColor(rowColor, rowColor, rowColor + 2);
    doc.rect(margin, currentY, contentWidth, rowHeight, 'F');
    doc.setDrawColor(230, 230, 240);
    doc.rect(margin, currentY, contentWidth, rowHeight, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(33, 17, 61);
    doc.text(item.day, margin + 3, currentY + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 60);
    doc.text(focusLines, margin + 45, currentY + 4.5);
    doc.text(item.format, margin + 125, currentY + 4.5);

    currentY += rowHeight;
  });
  currentY += 6;

  // 9. Channels
  printSectionHeader('09', 'Marketing Channel Recommendations');
  printBulletList(plan.channelRecommendations);

  // 10. Budget
  printSectionHeader('10', 'Capital & Budget Allocation');
  if (plan.budgetAllocation && plan.budgetAllocation.length > 0) {
    printBulletList(plan.budgetAllocation);
  } else {
    printParagraph('Organic Bootstrapping & Creator Seeding (Zero Direct Paid Ad Spend)');
  }

  // 11. KPIs
  printSectionHeader('11', 'Key Performance Indicator (KPI) Benchmarks');
  printBulletList(plan.kpis);

  // 12. Next Steps
  printSectionHeader('12', '72-Hour Rapid Execution Path');
  printBulletList(plan.nextSteps);

  // Bottom footer page numbers
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 150);
    doc.text(
      `MarketMate.AI — Marketing Engine  |  Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  const filename = `${getSlug(plan.businessName)}-marketing-report.pdf`;
  doc.save(filename);
};

/**
 * 2. Export as a Formatted Microsoft Word / Google Docs document (.doc)
 */
export const exportCampaignToWord = (plan: CampaignPlan) => {
  const dateStr = new Date(plan.createdAt).toLocaleDateString();

  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${plan.businessName} - Campaign Strategy Report</title>
      <style>
        body {
          font-family: 'Segoe UI', Calibri, Arial, sans-serif;
          color: #21113D;
          line-height: 1.6;
          margin: 40px;
        }
        .header-brand {
          color: #7138D8;
          font-size: 11pt;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          border-bottom: 2pt solid #7138D8;
          padding-bottom: 5px;
        }
        h1 {
          color: #21113D;
          font-size: 26pt;
          margin-top: 15px;
          margin-bottom: 5px;
        }
        .meta {
          color: #6B7280;
          font-size: 11pt;
          margin-bottom: 25px;
        }
        h2 {
          color: #7138D8;
          font-size: 15pt;
          margin-top: 25px;
          margin-bottom: 8px;
          border-left: 4pt solid #7138D8;
          padding-left: 10px;
        }
        .highlight-box {
          background-color: #F8F6FF;
          border: 1pt solid #E9D5FF;
          border-radius: 6px;
          padding: 12px 16px;
          margin: 12px 0;
          font-size: 12pt;
          font-weight: bold;
          color: #7138D8;
        }
        p, li {
          font-size: 11pt;
          color: #374151;
        }
        ul, ol {
          margin-top: 6px;
          margin-bottom: 14px;
        }
        li {
          margin-bottom: 6px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
          margin-bottom: 20px;
        }
        th {
          background-color: #7138D8;
          color: #FFFFFF;
          font-weight: bold;
          text-align: left;
          padding: 10px;
          font-size: 10pt;
        }
        td {
          border: 1pt solid #E5E7EB;
          padding: 10px;
          font-size: 10pt;
        }
        tr:nth-child(even) {
          background-color: #F9FAFB;
        }
        .caption-card {
          background-color: #FAFAFA;
          border-left: 3pt solid #7138D8;
          padding: 10px 14px;
          margin-bottom: 12px;
        }
        .footer {
          margin-top: 40px;
          border-top: 1pt solid #E5E7EB;
          padding-top: 15px;
          text-align: center;
          font-size: 9pt;
          color: #9CA3AF;
        }
      </style>
    </head>
    <body>
      <div class="header-brand">MarketMate.AI // Marketing Engine Strategy Blueprint</div>
      <h1>Campaign Plan: ${plan.businessName}</h1>
      <div class="meta">
        <strong>Generated:</strong> ${dateStr} &nbsp;|&nbsp; 
        <strong>Target Platform:</strong> ${plan.platform || 'Multi-Platform'} &nbsp;|&nbsp; 
        <strong>Campaign Tone:</strong> ${plan.campaignTone || 'Strategic'}
      </div>

      <h2>1. Executive Campaign Overview</h2>
      <p>${plan.overview}</p>

      <h2>2. Target Audience Insights</h2>
      <p>${plan.audienceInsights}</p>

      <h2>3. Unique Selling Proposition (USP)</h2>
      <div class="highlight-box">"${plan.usp}"</div>

      <h2>4. Campaign Theme & Slogan</h2>
      <p><strong>Primary Theme:</strong> ${plan.themeAndSlogan.theme}</p>
      <p><strong>Brand Slogan:</strong> "${plan.themeAndSlogan.slogan}"</p>

      <h2>5. Social Media Content Concepts</h2>
      <ol>
        ${plan.contentIdeas.map((idea) => `<li>${idea}</li>`).join('')}
      </ol>

      <h2>6. Ready-to-Use Social Captions</h2>
      ${plan.captions
        .map(
          (c, i) => `
        <div class="caption-card">
          <p><strong>Caption Option 0${i + 1}</strong></p>
          <p><strong>Hook:</strong> ${c.hook}</p>
          <p><strong>Body:</strong> ${c.body.replace(/\n/g, '<br/>')}</p>
          <p><strong>Call to Action:</strong> ${c.callToAction}</p>
        </div>
      `
        )
        .join('')}

      <h2>7. Suggested Hashtag Clusters</h2>
      <p>${plan.hashtags.join(' ')}</p>

      <h2>8. 7-Day Strategic Content Calendar</h2>
      <table>
        <thead>
          <tr>
            <th>Cadence / Day</th>
            <th>Content Focus</th>
            <th>Format / Platform</th>
          </tr>
        </thead>
        <tbody>
          ${plan.contentCalendar
            .map(
              (row) => `
            <tr>
              <td><strong>${row.day}</strong></td>
              <td>${row.contentFocus}</td>
              <td>${row.format}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>

      <h2>9. Marketing Channel Recommendations</h2>
      <ul>
        ${plan.channelRecommendations.map((ch) => `<li>${ch}</li>`).join('')}
      </ul>

      <h2>10. Budget Allocation Strategy</h2>
      <ul>
        ${
          plan.budgetAllocation && plan.budgetAllocation.length > 0
            ? plan.budgetAllocation.map((b) => `<li>${b}</li>`).join('')
            : '<li>Organic Bootstrapping & Creator Seeding</li>'
        }
      </ul>

      <h2>11. Key Performance Indicators (KPIs)</h2>
      <ul>
        ${plan.kpis.map((kpi) => `<li>${kpi}</li>`).join('')}
      </ul>

      <h2>12. Recommended 72-Hour Next Steps</h2>
      <ol>
        ${plan.nextSteps.map((step) => `<li>${step}</li>`).join('')}
      </ol>

      <div class="footer">
        Generated with MarketMate.AI — Intelligent Marketing Engine. Confidential Strategy Document.
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${getSlug(plan.businessName)}-marketing-strategy.doc`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * 3. Export as a Formatted Multi-Row Excel Spreadsheet (.xls / .xlsx-compatible)
 */
export const exportCampaignToExcel = (plan: CampaignPlan) => {
  // Build structured rows for Excel
  const rows: Array<{
    pillar: string;
    section: string;
    deliverable: string;
    details: string;
    channel: string;
    metric: string;
  }> = [];

  // 1. Overview
  rows.push({
    pillar: '01',
    section: 'Executive Overview',
    deliverable: 'Campaign Mission',
    details: plan.overview,
    channel: plan.platform || 'Multi-Channel',
    metric: 'Strategic Alignment',
  });

  // 2. Audience Insights
  rows.push({
    pillar: '02',
    section: 'Audience Insights',
    deliverable: 'Core Buyer Persona',
    details: plan.audienceInsights,
    channel: 'All Channels',
    metric: 'High Conversion Persona',
  });

  // 3. USP
  rows.push({
    pillar: '03',
    section: 'Unique Selling Proposition',
    deliverable: 'Brand Value Hook',
    details: plan.usp,
    channel: 'Positioning',
    metric: 'Defensible Advantage',
  });

  // 4. Theme & Slogan
  rows.push({
    pillar: '04',
    section: 'Theme & Slogan',
    deliverable: 'Campaign Theme',
    details: plan.themeAndSlogan.theme,
    channel: 'Creative Narrative',
    metric: 'Story Anchor',
  });
  rows.push({
    pillar: '04',
    section: 'Theme & Slogan',
    deliverable: 'Brand Slogan',
    details: plan.themeAndSlogan.slogan,
    channel: 'Brand Tagline',
    metric: 'Brand Recall',
  });

  // 5. Content Ideas
  plan.contentIdeas.forEach((idea, idx) => {
    rows.push({
      pillar: '05',
      section: 'Content Ideas',
      deliverable: `Concept ${idx + 1}`,
      details: idea,
      channel: plan.platform || 'Social',
      metric: 'Engagement Vector',
    });
  });

  // 6. Social Captions
  plan.captions.forEach((cap, idx) => {
    rows.push({
      pillar: '06',
      section: 'Ready-to-Use Captions',
      deliverable: `Caption Option 0${idx + 1} - Hook`,
      details: cap.hook,
      channel: plan.platform || 'Instagram/TikTok',
      metric: 'Stop-Scroll Rate',
    });
    rows.push({
      pillar: '06',
      section: 'Ready-to-Use Captions',
      deliverable: `Caption Option 0${idx + 1} - Body Story`,
      details: cap.body,
      channel: plan.platform || 'Instagram/TikTok',
      metric: 'Read-Through Rate',
    });
    rows.push({
      pillar: '06',
      section: 'Ready-to-Use Captions',
      deliverable: `Caption Option 0${idx + 1} - Call to Action`,
      details: cap.callToAction,
      channel: plan.platform || 'Instagram/TikTok',
      metric: 'Click-Through Rate',
    });
  });

  // 7. Hashtags
  rows.push({
    pillar: '07',
    section: 'Hashtag Clusters',
    deliverable: 'Curated Tag Set',
    details: plan.hashtags.join(' '),
    channel: 'Discovery & SEO',
    metric: 'Algorithm Reach',
  });

  // 8. Content Calendar
  plan.contentCalendar.forEach((cal) => {
    rows.push({
      pillar: '08',
      section: '7-Day Content Calendar',
      deliverable: cal.day,
      details: cal.contentFocus,
      channel: cal.format,
      metric: 'Publishing Cadence',
    });
  });

  // 9. Channel Recommendations
  plan.channelRecommendations.forEach((ch, idx) => {
    rows.push({
      pillar: '09',
      section: 'Channel Strategy',
      deliverable: `Priority Stream ${idx + 1}`,
      details: ch,
      channel: 'Acquisition',
      metric: 'Platform Synergy',
    });
  });

  // 10. Budget Allocation
  if (plan.budgetAllocation && plan.budgetAllocation.length > 0) {
    plan.budgetAllocation.forEach((b, idx) => {
      rows.push({
        pillar: '10',
        section: 'Budget Allocation',
        deliverable: `Bucket ${idx + 1}`,
        details: b,
        channel: 'Financial Discipline',
        metric: 'Spend ROI',
      });
    });
  } else {
    rows.push({
      pillar: '10',
      section: 'Budget Allocation',
      deliverable: 'Organic Allocation',
      details: 'Zero Paid Spend / Organic Bootstrapping & Creator Product Seeding',
      channel: 'Organic',
      metric: 'Lean CAC',
    });
  }

  // 11. KPIs
  plan.kpis.forEach((kpi, idx) => {
    rows.push({
      pillar: '11',
      section: 'KPI Success Benchmarks',
      deliverable: `Metric Benchmark ${idx + 1}`,
      details: kpi,
      channel: 'Measurement',
      metric: 'Leading KPI Target',
    });
  });

  // 12. Next Steps
  plan.nextSteps.forEach((step, idx) => {
    rows.push({
      pillar: '12',
      section: '72-Hour Next Steps',
      deliverable: `Step ${idx + 1}`,
      details: step,
      channel: 'Execution',
      metric: 'Launch Critical Path',
    });
  });

  // Generate Excel XML/HTML Workbook structure
  const excelHtml = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>Campaign Blueprint</x:Name>
              <x:WorksheetOptions>
                <x:DisplayGridlines/>
              </x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <style>
        th {
          background-color: #7138D8;
          color: #FFFFFF;
          font-family: Arial, sans-serif;
          font-size: 11pt;
          font-weight: bold;
          border: 1pt solid #4A1D96;
          padding: 8px;
        }
        td {
          font-family: Arial, sans-serif;
          font-size: 10pt;
          border: 0.5pt solid #D1D5DB;
          padding: 6px 10px;
          vertical-align: top;
        }
        .header-meta {
          background-color: #21113D;
          color: #FFFFFF;
          font-size: 13pt;
          font-weight: bold;
          padding: 10px;
        }
        .stripe {
          background-color: #F8F6FF;
        }
      </style>
    </head>
    <body>
      <table>
        <tr>
          <td colspan="6" class="header-meta">
            MarketMate.AI — Marketing Strategy Workbook: ${plan.businessName} (Created: ${new Date(plan.createdAt).toLocaleDateString()})
          </td>
        </tr>
        <tr>
          <th>Pillar #</th>
          <th>Section</th>
          <th>Deliverable</th>
          <th>Strategic Details / Copy</th>
          <th>Platform / Channel</th>
          <th>Target Metric / Focus</th>
        </tr>
        ${rows
          .map(
            (r, i) => `
          <tr class="${i % 2 === 0 ? '' : 'stripe'}">
            <td align="center"><strong>${r.pillar}</strong></td>
            <td><strong>${r.section}</strong></td>
            <td>${r.deliverable}</td>
            <td>${r.details.replace(/"/g, '&quot;')}</td>
            <td>${r.channel}</td>
            <td>${r.metric}</td>
          </tr>
        `
          )
          .join('')}
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', excelHtml], {
    type: 'application/vnd.ms-excel;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${getSlug(plan.businessName)}-marketing-data.xls`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
