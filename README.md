<!-- @format -->

# DNS Propagation Checker

A DNS Propagation Checker built with Svelte that allows users to check the propagation of DNS records across multiple DNS servers. This tool also highlights whether the DNS records match an expected IP address.

## Features

- Check DNS propagation across multiple DNS servers.
- Highlight DNS records that match an expected IP address.
- Display server locations on an interactive globe using Cobe.
- Supports various DNS record types (A, AAAA, CNAME, MX, NS, SOA, TXT).

## Installation

Follow these steps to set up the project locally.

### Prerequisites

- Node.js and npm installed on your machine.
- A GitHub account for hosting the project (optional).

### Clone the Repository

git clone https://github.com/lukeoregan88/dns-propagation-checker.git
cd dns-propagation-checker

### Install Dependencies

npm install

### Build the Application

npm run build

### Run the Development Server

npm run dev
Open your browser and navigate to http://localhost:5173.

### Usage

    1.	Enter the domain name you want to check in the input field.
    2.	Select the DNS record type from the dropdown menu.
    3.	(Optional) Enter the expected IP address to highlight matching records.
    4.	Click the "Check" button to start the DNS propagation check.

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Acknowledgments

    •	Svelte
    •	Cobe
    •	NetworkCalc DNS API
    •	ipinfo API

### Contact

For any inquiries or feedback, please contact lukeoregan88.
