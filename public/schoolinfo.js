function loadSchools() {
    // Dummy data for schools based on district selection
    const districtSelect = document.getElementById('district');
    const schoolSelect = document.getElementById('school');

    // Clear existing school options
    schoolSelect.innerHTML = '';

    // Populate schools based on district selection
    switch (districtSelect.value) {
        case 'Ahmednagar':
            addSchoolOption('Alex English School Washim', 'Alex English School Washim');
            addSchoolOption('Chatrapati Shivaji Dnyanpeeth Washim', 'Chatrapati Shivaji Dnyanpeeth Washim');
            addSchoolOption('Happy Faces The Concept School Washim', 'Happy Faces The Concept School Washim');
            addSchoolOption('Krantiveer Lahuji Vidhya Mandir Washim', 'Krantiveer Lahuji Vidhya Mandir Washim');
            addSchoolOption('Lions Vidhyaniketan Madhyamik Vidhyalaya, Washim', 'Lions Vidhyaniketan Madhyamik Vidhyalaya Washim');
            addSchoolOption('Maharshi Sant Gadge Maharaj Marathi Primary School Washim', 'Maharshi Sant Gadge Maharaj Marathi Primary School Washim');
            addSchoolOption('Mahatma Jyotiba Fule Vidya Niketan Washim', 'Mahatma Jyotiba Fule Vidya Niketan Washim');
            addSchoolOption('Mauli Vidyamandir English School Washim', 'Mauli Vidyamandir English School Washim');
            addSchoolOption('Mulibai Charkha Pr. English Sc', 'Mulibai Charkha Pr. English Sc');
            addSchoolOption('N.p. Mahatma Phule Vidhyamandir Washim', 'N.p. Mahatma Phule Vidhyamandir Washim');
            addSchoolOption('N.p. Sardar Patel Vidhya Mandir Washim', 'N.p. Sardar Patel Vidhya Mandir Washim');
            addSchoolOption('Narayana Secondary And Higher Secondary School Washim', 'Narayana Secondary And Higher Secondary School Washim');
            addSchoolOption('Navodyaya Vidyalaya Washim', 'Navodyaya Vidyalaya Washim');
            addSchoolOption('Rani Laxmibai Kanya Shala Washim', 'Rani Laxmibai Kanya Shala Washim');
            addSchoolOption('Rani Laxmibai Pr.kanya Schoo Washim', 'Rani Laxmibai Pr.kanya Schoo Washim');
            addSchoolOption('Rekhatai Rashtriy Kanya Vidhyalaya Washim', '	Rekhatai Rashtriy Kanya Vidhyalaya Washim');
            addSchoolOption('Saraswati Primary Marathi School, Akola Naka Washim', 'Saraswati Primary Marathi School, Akola Naka Washim');
            addSchoolOption('Sau. Sushilatai Jadhav Vidhyaniketan Washim', 'Sau. Sushilatai Jadhav Vidhyaniketan Washim');
            addSchoolOption('Savitribai Fule English School Washim', 'Savitribai Fule English School Washim');
            break;
        case 'Akola':
            addSchoolOption('school3', 'School 3');
            addSchoolOption('school4', 'School 4');
            break;
        // Add more cases for additional districts
    }
}

function addSchoolOption(value, text) {
    const schoolSelect = document.getElementById('school');
    const option = document.createElement('option');
    option.value = value;
    option.text = text;
    schoolSelect.add(option);
}
