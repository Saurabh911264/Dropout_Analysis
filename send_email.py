import sys
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Extract command-line arguments
to_address = sys.argv[1]
subject = sys.argv[2]
body = sys.argv[3]

# SMTP server configuration (replace with your SMTP server details)
smtp_server = 'smtp.gmail.com'
smtp_port = 587
smtp_username = 'saurabhdeshmukh267@gmail.com'
smtp_password = 'saurabh@iitbombay'

# Create the MIME message
message = MIMEMultipart()
message['From'] = smtp_username
message['To'] = to_address
message['Subject'] = subject
message.attach(MIMEText(body, 'plain'))

# Connect to the SMTP server and send the email
try:
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.sendmail(smtp_username, to_address, message.as_string())
    sys.exit(0)  # Exit with success status
except Exception as e:
    print(f'Error sending email: {e}')
    sys.exit(1)  # Exit with error status
