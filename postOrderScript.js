function onFormSubmit(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('answers')
  var row = sheet.getLastRow()

  const date = new Date()

  const eatFormatter = new Intl.DateTimeFormat('en-KE', {
    timeZone: 'Africa/Nairobi', // EAT (UTC+3)
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  const eatDateTime = eatFormatter.format(date)

  var timestampColumn = 1
  var nameColumn = 2
  var emailColumn = 3
  var addressColumn = 4
  var countryColumn = 5
  var phoneColumn = 6
  var orderColumn = 7
  var amountColumn = 8
  var totalPriceColumn = 9
  var orderIdColumn = 10
  var checkmarkColumn = 11

  var email = sheet.getRange(row, emailColumn).getValue()
  var timestamp = sheet.getRange(row, timestampColumn).getValue()
  var companyEmail = 'info@mnsportive.com'
  var name = sheet.getRange(row, nameColumn).getValue()
  var amount = sheet.getRange(row, totalPriceColumn).getValue()
  var address = sheet.getRange(row, addressColumn).getValue()
  var items = sheet.getRange(row, orderColumn).getValue()
  var country = sheet.getRange(row, countryColumn).getValue()
  var phone = sheet.getRange(row, phoneColumn).getValue()
  var orderNumber = sheet.getRange(row, orderIdColumn).getValue()
  var sentMarker = sheet.getRange(row, checkmarkColumn).getValue()

  if (email && !sentMarker) {
    try {
      // Generate the invoice PDF
      var pdfBlob = generateInvoicePDF(
        orderNumber,
        name,
        address,
        country,
        phone,
        email,
        eatDateTime,
        items,
        amount
      )

      // Save the invoice to Google Drive in generatedInvoices folder
      var invoiceFile = saveInvoiceToFolder(pdfBlob, orderNumber, name)

      var customerSubject = `Facture proforma – Règlement de votre commande n° ${orderNumber}`
      var customerBody = `
      <div style="line-height: 1;">
  <h2 style="margin-bottom: 10px;">Salut ${name}!</h2>
      <div>Merci pour votre commande sur <strong>Mayotte Nutrition Sportive</strong>. Vous trouverez ci-dessous les détails de votre commande ainsi que les informations de paiement.</div>
      <div>Veuillez trouver en pièce jointe votre facture proforma.</div>
      <h3>Détails de la commande</h3>
    <ul>
        <li><strong>Numéro de commande:</strong> ${orderNumber}</li>
        <li><strong>Date de la commande:</strong> ${eatDateTime}</li>
        <li><strong>Produits commandés:</strong>
            <ul>
                ${items}
            </ul>
        </li>
        <li><strong>Total à payer:</strong> ${amount}€</li>
    </ul>
    <h3>Informations de paiement</h3>
    <div>Nous vous prions de bien vouloir effectuer le règlement sous 3 jours en utilisant les informations suivantes:</div>
    <ul>
        <li><strong>Bénéficiaire:</strong> Mayotte Nutrition Sportive</li>
        <li><strong>IBAN:</strong> BE91905368267476</li>
        <li><strong>BIC/SWIFT:</strong> TRWIBEB1XXX</li>
        <li><strong>Banque:</strong> Wise</li>
        <li><strong>Montant:</strong> ${amount}€</li>
        <li><strong>Référence de paiement:</strong> ${orderNumber}</li>
    </ul>
    <div>Dès réception du paiement, nous procéderons à l'expédition de votre commande et vous enverrons un e-mail de confirmation avec les détails de livraison.</div>
    <div>Pour toute question, n'hésitez pas à nous contacter à <a href="mailto:info@mnsportive.com">info@mnsportive.com</a>.</div>
    <div>Merci pour votre confiance et à bientôt!</div>
    <div><strong>L'équipe Mayotte Nutrition Sportive</strong></div>
    <div><a href="https://mnsportive.com">mnsportive.com</a></div>
    </div>`
      var customerHtmlBody = customerBody.replace(/\n/g, '<br>')

      GmailApp.sendEmail(email, customerSubject, customerBody, {
        htmlBody:
          '<div style="font-family: Arial, sans-serif;">' +
          customerHtmlBody +
          '</div>',
        name: 'Mayotte Nutrition Sportive',
        attachments: [pdfBlob], // Attach the PDF invoice
      })

      // Add delay between emails
      Utilities.sleep(2000)

      // sajat email
      var companySubject = `Nouvelle commande - ${orderNumber} - ${name}`
      var companyBody = `${name} a passé une commande d'une valeur de ${amount}€. L'envoi doit être effectué à l'adresse suivante : \n\n${address}, ${country}\n Les articles commandés :\n\n${items}\n\n email: ${email}\n téléphone: ${phone}`
      var companyHtmlBody = companyBody.replace(/\n/g, '<br>')

      GmailApp.sendEmail(companyEmail, companySubject, companyBody, {
        htmlBody:
          '<div style="font-family: Arial, sans-serif;">' +
          companyHtmlBody +
          '</div>',
        name: 'Mayotte Nutrition Sportive',
        attachments: [pdfBlob], // Also attach the PDF to your email
      })

      sheet.getRange(row, checkmarkColumn).setValue('✅')
    } catch (error) {
      sheet
        .getRange(row, checkmarkColumn)
        .setValue('❌ Error: ' + error.toString().substring(0, 500))
      console.error('Email error: ' + error)
    }
  }
}

/**
 * Saves the invoice PDF to a specified folder in Google Drive
 * @param {Blob} pdfBlob - The PDF blob to save
 * @param {string} orderNumber - The order number for the filename
 * @param {string} customerName - The customer name for the filename
 * @return {GoogleAppsScript.Drive.File} The created file
 */
function saveInvoiceToFolder(pdfBlob, orderNumber, customerName) {
  // Format filename: Facture_INV-2025-001_CustomerName.pdf
  var safeCustomerName = customerName.replace(/[^a-zA-Z0-9]/g, '_') // Remove special characters
  var fileName = `Facture_${orderNumber}_${safeCustomerName}.pdf`

  // Get or create the generatedInvoices folder
  var folder = getOrCreateFolder('generatedInvoices')

  // Save the file to the folder
  var file = folder.createFile(pdfBlob.setName(fileName))

  // Return the file object
  return file
}

/**
 * Gets a folder by name or creates it if it doesn't exist
 * @param {string} folderName - The name of the folder to find or create
 * @return {GoogleAppsScript.Drive.Folder} The folder
 */
function getOrCreateFolder(folderName) {
  var folders = DriveApp.getRootFolder().getFoldersByName(folderName)

  if (folders.hasNext()) {
    return folders.next()
  }

  var newFolder = DriveApp.getRootFolder().createFolder(folderName)
  return newFolder
}

function generateInvoicePDF(
  orderNumber,
  customerName,
  address,
  country,
  phone,
  email,
  invoiceDate,
  itemsText,
  totalAmount
) {
  function getTodayEuropeanFormat() {
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0') // Months are 0-based
    const yyyy = today.getFullYear()
    return `${dd}/${mm}/${yyyy}`
  }

  function addThreeDays(dateStr) {
    const [dd, mm, yyyy] = dateStr.split('/').map(Number)
    const date = new Date(yyyy, mm - 1, dd) // Create date from European format
    date.setDate(date.getDate() + 3) // Add 3 days
    const newDd = String(date.getDate()).padStart(2, '0')
    const newMm = String(date.getMonth() + 1).padStart(2, '0')
    const newYyyy = date.getFullYear()
    return `${newDd}/${newMm}/${newYyyy}`
  }

  var formattedInvoiceDate = getTodayEuropeanFormat()
  var formattedDueDate = addThreeDays(formattedInvoiceDate)

  // Parse items string into an array of items
  var items = []
  if (itemsText) {
    var itemLines = itemsText.split('\n')
    for (var j = 0; j < itemLines.length; j++) {
      var line = itemLines[j].trim()
      if (line) {
        // Parse the line in the format "<li>1 x Rice Pudding 1000g - 26007010301</li>"
        // Remove <li> and </li> tags if present
        line = line.replace(/<\/?li>/g, '')

        // Parse the line that looks like "1 x Rice Pudding 1000g - 26007010301"
        var quantityMatch = line.match(/^(\d+) x (.+) - (\d+)$/)

        if (quantityMatch) {
          var quantity = parseInt(quantityMatch[1])
          var description = quantityMatch[2]
          var reference = quantityMatch[3]

          // Look up price - for now, we'll assume a unit price calculation from total amount
          // In a real scenario, you would have a price lookup table
          var estimatedUnitPrice =
            parseFloat(totalAmount) / itemLines.length / quantity

          items.push({
            description: description,
            quantity: quantity,
            reference: reference,
          })
        }
      }
    }
  }

  // If address has multiple lines, combine them
  var fullAddress = address
  if (country) {
    fullAddress += ', ' + country
  }

  // Create items table rows HTML
  var itemsTableRows = ''
  items.forEach(function (item) {
    itemsTableRows +=
      '<tr>' +
      '<td>' +
      item.description +
      '</td>' +
      '<td>' +
      item.quantity +
      '</td>' +
      '<td>' +
      item.reference +
      '</td>' +
      '</tr>'
  })

  // Get the HTML template from Google Drive
  var templateHtml = getInvoiceTemplate()

  // Replace placeholders with actual values
  templateHtml = templateHtml
    .replace(/{{orderNumber}}/g, orderNumber)
    .replace(/{{customerName}}/g, customerName)
    .replace(/{{customerAddress}}/g, fullAddress)
    .replace(/{{customerPhone}}/g, phone)
    .replace(/{{customerEmail}}/g, email)
    .replace(/{{invoiceDate}}/g, formattedInvoiceDate)
    .replace(/{{dueDate}}/g, formattedDueDate)
    .replace(/{{itemsTableRows}}/g, itemsTableRows)
    .replace(/{{totalAmount}}/g, totalAmount)

  // Create PDF from HTML
  var pdfBlob = HtmlService.createHtmlOutput(templateHtml)
    .getAs('application/pdf')
    .setName('Facture_' + orderNumber + '.pdf')

  return pdfBlob
}

/**
 * Gets the invoice HTML template from a file in Google Drive
 * If the file doesn't exist, creates it with a default template
 */
function getInvoiceTemplate() {
  var templateFileName = 'invoice_template.html'
  var templateFiles = DriveApp.getFilesByName(templateFileName)

  // If template file exists, use it
  if (templateFiles.hasNext()) {
    var templateFile = templateFiles.next()
    return templateFile.getBlob().getDataAsString()
  }
  // If template file doesn't exist, create it with default template
  else {
    var defaultTemplate = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facture MAYOTTE NUTRITION SPORTIVE</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
            font-size: 12px;
        }
        .invoice-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
        }
        .company-info {
            width: 50%;
        }
        .customer-info {
            width: 40%;
            text-align: right;
        }
        .invoice-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
        }
        .payment-info {
            margin: 20px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        table th, table td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        table th {
            background-color: #f2f2f2;
        }
        .totals {
            width: 40%;
            margin-left: auto;
            margin-top: 20px;
        }
        .payment-note {
            margin-top: 30px;
            font-style: italic;
        }
        .footer {
            margin-top: 40px;
            font-size: 10px;
        }
        .date-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        .date-block {
            width: 45%;
        }
    </style>
</head>
<body>
    <div class="invoice-header">
        <div class="company-info">
            <div class="invoice-title">Facture N°{{orderNumber}}</div>
            <div>MAYOTTE NUTRITION SPORTIVE</div>
            <div>Place Mariage</div>
            <div>Bal N19 - CS 73904</div>
            <div>97600 Mamoudzou</div>
            <div>Siret : 941 847 907 00016</div>
            <div>Tél : +262 639 26 39 51</div>
            <div>TVA : FR 819 418 47907</div>
            <div>E-mail : info@mnsportive.com</div>
            <div>Site : www.mnsportive.com</div>
        </div>
        <div class="customer-info">
            <div>{{customerName}}</div>
            <div>{{customerAddress}}</div>
            <div>Tél : {{customerPhone}}</div>
            <div>E-mail : {{customerEmail}}</div>
        </div>
    </div>

    <div class="payment-info">
      <div>Référence: numéro de commande {{orderNumber}}</div>
      <div>
        Le paiement de votre commande s'effectue exclusivement par virement
        bancaire.
      </div>
      <div>Bénéficiaire: Mayotte Nutrition Sportive</div>
      <div>IBAN: BE91905368267476</div>
      <div>BIC/SWIFT: TRWIBEB1XXX</div>
      <div>Banque: Wise</div>
    </div>

    <div class="date-info">
        <div class="date-block">
            <div>Date de facture</div>
            <div>{{invoiceDate}}</div>
        </div>
        <div class="date-block">
            <div>Echéance de paiement</div>
            <div>{{dueDate}}</div>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Description</th>
                <th>Quantité</th>
                <th>Référence</th>
            </tr>
        </thead>
        <tbody>
            {{itemsTableRows}}
        </tbody>
    </table>

    <div class="payment-note">
        Les prix des produits sont indiqués en EUR, toutes taxes comprises. Les frais de livraison sont inclus.
        <br>TVA non applicable, art. 293B du CGI
    </div>
</body>
</html>`

    // Create the template file in Google Drive
    var newFile = DriveApp.createFile(
      templateFileName,
      defaultTemplate,
      'text/html'
    )
    return defaultTemplate
  }
}

/**
 * Creates a menu item in Google Sheets to manually create invoices
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi()
  ui.createMenu('Invoices')
    .addItem('Send Invoice for Selected Row', 'manualSendInvoice')
    .addItem('Edit Invoice Template', 'editInvoiceTemplate')
    .addItem('Open Invoices Folder', 'openInvoicesFolder')
    .addToUi()
}

/**
 * Function to manually send an invoice for the selected row
 */
function manualSendInvoice() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  if (sheet.getName() !== 'answers') {
    SpreadsheetApp.getUi().alert("Please select a row on the 'answers' sheet")
    return
  }

  var selectedRow = sheet.getActiveRange().getRow()
  if (selectedRow > 1) {
    // Skip header row
    onFormSubmit({
      range: sheet.getRange(selectedRow, 1, 1, sheet.getLastColumn()),
    })
    SpreadsheetApp.getUi().alert('Invoice sent for row ' + selectedRow)
  } else {
    SpreadsheetApp.getUi().alert('Please select a data row, not the header')
  }
}

/**
 * Function to open the invoice template for editing
 */
function editInvoiceTemplate() {
  var templateFileName = 'invoice_template.html'
  var templateFiles = DriveApp.getFilesByName(templateFileName)

  if (templateFiles.hasNext()) {
    var templateFile = templateFiles.next()
    var url = templateFile.getUrl()

    // Open the file in a new browser tab
    var html = HtmlService.createHtmlOutput(
      '<script>window.open("' +
        url +
        '", "_blank"); google.script.host.close();</script>'
    )
      .setWidth(10)
      .setHeight(10)

    SpreadsheetApp.getUi().showModalDialog(html, 'Opening template...')
  } else {
    // If template doesn't exist, create it first
    getInvoiceTemplate()
    editInvoiceTemplate()
  }
}

/**
 * Function to open the generated invoices folder
 */
function openInvoicesFolder() {
  var folder = getOrCreateFolder('generatedInvoices')
  var url = folder.getUrl()

  // Open the folder in a new browser tab
  var html = HtmlService.createHtmlOutput(
    '<script>window.open("' +
      url +
      '", "_blank"); google.script.host.close();</script>'
  )
    .setWidth(10)
    .setHeight(10)

  SpreadsheetApp.getUi().showModalDialog(html, 'Opening invoices folder...')
}
