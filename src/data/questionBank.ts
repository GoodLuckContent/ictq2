export type QuestionTopic = "HTML & CSS" | "JavaScript" | "Networking" | "LaTeX" | "OOP";
export type QuestionDifficulty = "easy" | "hard";

export interface McqQuestion {
  id: number;
  type: "mcq";
  topic: QuestionTopic;
  difficulty: QuestionDifficulty;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  answer: "A" | "B" | "C" | "D";
}

export interface TfQuestion {
  id: number;
  type: "tf";
  topic: QuestionTopic;
  difficulty: QuestionDifficulty;
  question: string;
  answer: boolean;
}

export interface FibQuestion {
  id: number;
  type: "fib";
  topic: QuestionTopic;
  difficulty: QuestionDifficulty;
  question: string;
  answer: string;
}

export type BankQuestion = McqQuestion | TfQuestion | FibQuestion;

export const MCQ_BANK: McqQuestion[] = [
  {
    "id": 1,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "In the ATM example, what is printed if an incorrect PIN is entered?",
    "options": {
      "A": "Withdrawal successful!",
      "B": "Invalid PIN.",
      "C": "Insufficient balance.",
      "D": "Thank you for using the ATM."
    },
    "answer": "B"
  },
  {
    "id": 2,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "Which element is the root element of an HTML document?",
    "options": {
      "A": "<html>",
      "B": "<body>",
      "C": "<main>",
      "D": "<head>"
    },
    "answer": "A"
  },
  {
    "id": 3,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "The <em> tag is used to:",
    "options": {
      "A": "Insert a line break",
      "B": "Embed a media file",
      "C": "Define an e-mail address",
      "D": "Show stress emphasis, usually rendered in italics"
    },
    "answer": "D"
  },
  {
    "id": 4,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "Which website is suggested in the lab for generating LaTeX table code?",
    "options": {
      "A": "Wikipedia.org",
      "B": "Overleaf.com",
      "C": "GitHub.com",
      "D": "TablesGenerator.com"
    },
    "answer": "D"
  },
  {
    "id": 5,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "Which CSS property sets the spacing between lines of text?",
    "options": {
      "A": "vertical-align",
      "B": "text-align",
      "C": "line-height",
      "D": "font-weight"
    },
    "answer": "C"
  },
  {
    "id": 6,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "Which element defines the title of a book, journal or poem?",
    "options": {
      "A": "<q>",
      "B": "<dfn>",
      "C": "<cite>",
      "D": "<abbr>"
    },
    "answer": "C"
  },
  {
    "id": 7,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "hard",
    "question": "What does \\graphicspath{ {images/} } tell LaTeX?",
    "options": {
      "A": "The images are kept in a folder named images",
      "B": "The images should be compressed",
      "C": "The images should be deleted",
      "D": "The images are stored on the internet"
    },
    "answer": "A"
  },
  {
    "id": 8,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "What is the purpose of the <!DOCTYPE html> declaration?",
    "options": {
      "A": "It links an external CSS file",
      "B": "It marks the root element of the page",
      "C": "It tells the browser the page is written in HTML5 so it renders in standards mode",
      "D": "It defines the title shown on the browser tab"
    },
    "answer": "C"
  },
  {
    "id": 9,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "What does the crawler of a search engine do?",
    "options": {
      "A": "Sorts search results by price",
      "B": "Encrypts user queries",
      "C": "Stores user passwords",
      "D": "Regularly scans websites for URLs, keywords and links to discover updates"
    },
    "answer": "D"
  },
  {
    "id": 10,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "Which protocol is shown in the lab diagram for sending e-mail between mail servers?",
    "options": {
      "A": "POP3",
      "B": "SMTP",
      "C": "FTP",
      "D": "IMAP"
    },
    "answer": "B"
  },
  {
    "id": 11,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "Roughly what range does a LAN cover, according to the lab?",
    "options": {
      "A": "Above 500 km",
      "B": "5 km to 50 km",
      "C": "Up to 2 km",
      "D": "Above 50 km"
    },
    "answer": "C"
  },
  {
    "id": 12,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "In the front-end trio, which technology is responsible for interactivity such as form validation and dynamic updates?",
    "options": {
      "A": "JavaScript",
      "B": "CSS",
      "C": "HTML",
      "D": "Prettier"
    },
    "answer": "A"
  },
  {
    "id": 13,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "Which tag defines a header cell in an HTML table?",
    "options": {
      "A": "<th>",
      "B": "<thead>",
      "C": "<tr>",
      "D": "<td>"
    },
    "answer": "A"
  },
  {
    "id": 14,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "Which of the following is NOT a way of adding CSS to an HTML file?",
    "options": {
      "A": "External",
      "B": "Compiled",
      "C": "Inline",
      "D": "Internal"
    },
    "answer": "B"
  },
  {
    "id": 15,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "Member functions of a class:",
    "options": {
      "A": "Define the behaviours of its objects",
      "B": "Cannot access data members",
      "C": "Store the values of the attributes",
      "D": "Are always private"
    },
    "answer": "A"
  },
  {
    "id": 16,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "In Class A, network 127 is reserved for:",
    "options": {
      "A": "Broadcasting to the Internet",
      "B": "Multicast",
      "C": "Research",
      "D": "Loopback and internal testing"
    },
    "answer": "D"
  },
  {
    "id": 17,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "With class child1 : public Parent, a member y that was protected in Parent becomes:",
    "options": {
      "A": "Private in child1",
      "B": "Public in child1",
      "C": "Inaccessible in child1",
      "D": "Protected in child1"
    },
    "answer": "D"
  },
  {
    "id": 18,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "In function greet(name) { return \"Hello, \" + name; }, what is name called?",
    "options": {
      "A": "A return value",
      "B": "A keyword",
      "C": "A parameter",
      "D": "An object"
    },
    "answer": "C"
  },
  {
    "id": 19,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "In the Account class, getDetails() returns:",
    "options": {
      "A": "The private balance (a double)",
      "B": "The account holder's name",
      "C": "Nothing (void)",
      "D": "The account number"
    },
    "answer": "A"
  },
  {
    "id": 20,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "In the Animal/Dog example, what is printed when animalPtr points to a Dog object and animalPtr->makeSound() is called?",
    "options": {
      "A": "The cat meows!",
      "B": "The dog barks!",
      "C": "This animal makes a generic sound.",
      "D": "Nothing is printed"
    },
    "answer": "B"
  },
  {
    "id": 21,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "According to the lab, comments in code should mainly explain:",
    "options": {
      "A": "The names of the variables",
      "B": "What every line does",
      "C": "Why the code is written a certain way",
      "D": "Who wrote the file"
    },
    "answer": "C"
  },
  {
    "id": 22,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "The first version of ECMAScript was released in which year?",
    "options": {
      "A": "2015",
      "B": "2009",
      "C": "1995",
      "D": "1997"
    },
    "answer": "D"
  },
  {
    "id": 23,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "hard",
    "question": "What does the descendant selector p a {} target?",
    "options": {
      "A": "Every <p> that comes right after an <a>",
      "B": "Any <a> inside a <p>, even if other elements sit in between",
      "C": "Only <a> elements that are direct children of <p>",
      "D": "All <p> elements with the class \"a\""
    },
    "answer": "B"
  },
  {
    "id": 24,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "The text written inside the <title> element appears:",
    "options": {
      "A": "At the bottom of the page",
      "B": "Inside the first paragraph",
      "C": "On the browser's title bar or tab",
      "D": "As the main heading on the page"
    },
    "answer": "C"
  },
  {
    "id": 25,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "Which VS Code setting makes code format automatically when you press Ctrl + S?",
    "options": {
      "A": "Word Wrap",
      "B": "Format On Save",
      "C": "Live Preview",
      "D": "Auto Reload"
    },
    "answer": "B"
  },
  {
    "id": 26,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "hard",
    "question": "Which element groups several labels and inputs in a form and can be captioned with <legend>?",
    "options": {
      "A": "<select>",
      "B": "<optgroup>",
      "C": "<fieldset>",
      "D": "<datalist>"
    },
    "answer": "C"
  },
  {
    "id": 27,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "hard",
    "question": "What does the CSS declaration float: left; do to an image?",
    "options": {
      "A": "Places it on the left side and lets text wrap around it",
      "B": "Centres it vertically in the page",
      "C": "Rounds its corners",
      "D": "Hides it from the page"
    },
    "answer": "A"
  },
  {
    "id": 28,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "hard",
    "question": "Which tag hides a block of code when the page loads?",
    "options": {
      "A": "<summary>",
      "B": "<aside>",
      "C": "<details>",
      "D": "<template>"
    },
    "answer": "D"
  },
  {
    "id": 29,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "Where can you see the output of console.log(\"Hello World\") when the page runs in a browser?",
    "options": {
      "A": "In the browser's title bar",
      "B": "On the page as an <h1> heading",
      "C": "In the Explorer pane of VS Code",
      "D": "In the Console tab of the browser's developer tools"
    },
    "answer": "D"
  },
  {
    "id": 30,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "The ability of a single entity to take on multiple forms is called:",
    "options": {
      "A": "Abstraction",
      "B": "Compilation",
      "C": "Polymorphism",
      "D": "Encapsulation"
    },
    "answer": "C"
  },
  {
    "id": 31,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "What is the range of Class A IP addresses?",
    "options": {
      "A": "128-191",
      "B": "1-127",
      "C": "224-239",
      "D": "192-223"
    },
    "answer": "B"
  },
  {
    "id": 32,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "What does <meta charset=\"UTF-8\"> do?",
    "options": {
      "A": "Links an external script",
      "B": "Sets the character encoding so text from many languages displays correctly",
      "C": "Sets the page title",
      "D": "Makes the page responsive"
    },
    "answer": "B"
  },
  {
    "id": 33,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "Which of the following is a function unique to the Bus class in the inheritance example?",
    "options": {
      "A": "busSpecificFunction()",
      "B": "applyBrakes()",
      "C": "capacity()",
      "D": "fuelAmount()"
    },
    "answer": "A"
  },
  {
    "id": 34,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "In <img src=\"images/user.jpg\" alt=\"An image of the user\" />, what does the src attribute specify?",
    "options": {
      "A": "The path to the image file",
      "B": "The text shown if the image fails to load",
      "C": "The width of the image",
      "D": "The border radius of the image"
    },
    "answer": "A"
  },
  {
    "id": 35,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "A \"leaky\" vulnerability results in loss of:",
    "options": {
      "A": "Availability",
      "B": "Integrity",
      "C": "Bandwidth",
      "D": "Confidentiality"
    },
    "answer": "D"
  },
  {
    "id": 36,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "Which attribute of the anchor tag <a> holds the URL of the destination?",
    "options": {
      "A": "src",
      "B": "rel",
      "C": "href",
      "D": "alt"
    },
    "answer": "C"
  },
  {
    "id": 37,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "What are the two primary attributes of encapsulation, according to the lab?",
    "options": {
      "A": "Data protection and information hiding",
      "B": "Inheritance and polymorphism",
      "C": "Overloading and overriding",
      "D": "Compilation and linking"
    },
    "answer": "A"
  },
  {
    "id": 38,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "In the OOP version of the BMI program, height in inches is converted to metres by multiplying by:",
    "options": {
      "A": "0.254",
      "B": "2.54",
      "C": "0.0254",
      "D": "12"
    },
    "answer": "C"
  },
  {
    "id": 39,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "Which of the following is a reason for IT security mentioned in the lab?",
    "options": {
      "A": "Preventing disruption of services such as denial-of-service attacks",
      "B": "Increasing monitor brightness",
      "C": "Reducing CPU clock speed",
      "D": "Making files larger"
    },
    "answer": "A"
  },
  {
    "id": 40,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "Data members of a class are:",
    "options": {
      "A": "The functions that manipulate data",
      "B": "The variables that store the attributes (state) of an object",
      "C": "The header files included",
      "D": "The compiler directives"
    },
    "answer": "B"
  },
  {
    "id": 41,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "Which interface of the PC is selected when connecting the cable in Packet Tracer?",
    "options": {
      "A": "Bluetooth0",
      "B": "Console0",
      "C": "FastEthernet0",
      "D": "Serial0"
    },
    "answer": "C"
  },
  {
    "id": 42,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "Which CSS property, with a value such as 50px on a 100px-wide image, gives the image a circular appearance?",
    "options": {
      "A": "vertical-align",
      "B": "border-radius",
      "C": "line-height",
      "D": "margin-right"
    },
    "answer": "B"
  },
  {
    "id": 43,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "What is the purpose of the Code Runner extension in VS Code?",
    "options": {
      "A": "To format code on save",
      "B": "To install Node.js automatically",
      "C": "To open a live preview in the browser",
      "D": "To run code in many programming languages directly from the editor"
    },
    "answer": "D"
  },
  {
    "id": 44,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "How many objects can be created from a single class description?",
    "options": {
      "A": "Only two",
      "B": "Only one",
      "C": "None until it is inherited",
      "D": "As many as needed"
    },
    "answer": "D"
  },
  {
    "id": 45,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "Who created Node.js in 2009 by embedding Chrome's open-source JavaScript engine in a C++ program?",
    "options": {
      "A": "Ryan Dahl",
      "B": "Tim Berners-Lee",
      "C": "Linus Torvalds",
      "D": "Brendan Eich"
    },
    "answer": "A"
  },
  {
    "id": 46,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "Which keyboard shortcut opens the Explorer pane in VS Code?",
    "options": {
      "A": "Ctrl + Shift + P",
      "B": "Ctrl + Shift + S",
      "C": "Ctrl + Alt + X",
      "D": "Ctrl + Shift + E"
    },
    "answer": "D"
  },
  {
    "id": 47,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "Which cable is picked to connect the two PCs directly in the Packet Tracer lab?",
    "options": {
      "A": "Console cable",
      "B": "Fibre-optic cable",
      "C": "Coaxial cable",
      "D": "Copper Cross-over cable"
    },
    "answer": "D"
  },
  {
    "id": 48,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "The Symbol primitive type is mainly used to create:",
    "options": {
      "A": "Very large integers",
      "B": "Floating-point numbers",
      "C": "Unique and immutable values, often used as object property keys",
      "D": "Text templates"
    },
    "answer": "C"
  },
  {
    "id": 49,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "hard",
    "question": "What does [width=\\textwidth] do when used with \\includegraphics?",
    "options": {
      "A": "Scales the image to the width of the text area",
      "B": "Rotates the image",
      "C": "Adds a border to the image",
      "D": "Sets the image height only"
    },
    "answer": "A"
  },
  {
    "id": 50,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "Which of the following are examples of protocols mentioned in the lab?",
    "options": {
      "A": "LAN, MAN and WAN",
      "B": "CPU, RAM and ROM",
      "C": "IP, TCP and HTTP",
      "D": "HTML, CSS and JS"
    },
    "answer": "C"
  },
  {
    "id": 51,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "Why can a function be assigned to a variable (let sayHello = greet;) in JavaScript?",
    "options": {
      "A": "Because functions are primitives",
      "B": "Because functions are objects",
      "C": "Because variables are constants",
      "D": "Because greet is a keyword"
    },
    "answer": "B"
  },
  {
    "id": 52,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "According to the lab, JavaScript statements should end with:",
    "options": {
      "A": "A semicolon",
      "B": "A colon",
      "C": "A comma",
      "D": "A period"
    },
    "answer": "A"
  },
  {
    "id": 53,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "In the ATM class, why can main() NOT directly access accountBalance?",
    "options": {
      "A": "Because it is a private member",
      "B": "Because it is a static member",
      "C": "Because it is a function",
      "D": "Because it is declared inside main"
    },
    "answer": "A"
  },
  {
    "id": 54,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "hard",
    "question": "How is the upper-case Greek letter Omega written?",
    "options": {
      "A": "\\OMEGA",
      "B": "\\Ohm",
      "C": "\\omega",
      "D": "\\Omega"
    },
    "answer": "D"
  },
  {
    "id": 55,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "Which VS Code extension is used to automatically format code and keep a consistent style?",
    "options": {
      "A": "Node Manager",
      "B": "Live Server",
      "C": "Prettier",
      "D": "Code Runner"
    },
    "answer": "C"
  },
  {
    "id": 56,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "What problem does inheritance solve in the Vehicle (Bus, Car, Truck) example?",
    "options": {
      "A": "Duplication of shared code",
      "B": "Slow compilation",
      "C": "Missing header files",
      "D": "Memory leaks"
    },
    "answer": "A"
  },
  {
    "id": 57,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "Which example is used in the lab to explain encapsulation?",
    "options": {
      "A": "A pocket calculator",
      "B": "A traffic signal",
      "C": "An ATM machine",
      "D": "A vehicle fleet"
    },
    "answer": "C"
  },
  {
    "id": 58,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "The Document Object Model (DOM) represents a web page as a:",
    "options": {
      "A": "Flat table of rows and columns",
      "B": "Tree-like model of objects (nodes)",
      "C": "Stack of JavaScript functions",
      "D": "Sequence of CSS rules"
    },
    "answer": "B"
  },
  {
    "id": 59,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "Which loop repeats the ATM menu until the user chooses exit?",
    "options": {
      "A": "for loop",
      "B": "if-else only",
      "C": "Recursion only",
      "D": "do-while loop (while choice != 3)"
    },
    "answer": "D"
  },
  {
    "id": 60,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "Which of the following are reference (non-primitive) data types in JavaScript?",
    "options": {
      "A": "BigInt only",
      "B": "null, undefined and symbols",
      "C": "Objects, arrays and functions",
      "D": "Strings, numbers and booleans"
    },
    "answer": "C"
  },
  {
    "id": 61,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "In the CIA triad, which term means systems and data are accessible when needed, even during power outages or natural disasters?",
    "options": {
      "A": "Authenticity",
      "B": "Confidentiality",
      "C": "Integrity",
      "D": "Availability"
    },
    "answer": "D"
  },
  {
    "id": 62,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "In C++, a class is best described as:",
    "options": {
      "A": "A programmer-defined data type with data members and member functions",
      "B": "A function that returns objects",
      "C": "A header file",
      "D": "A built-in numeric type"
    },
    "answer": "A"
  },
  {
    "id": 63,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "Which command produces italic text?",
    "options": {
      "A": "\\textbf{...}",
      "B": "\\bf{...}",
      "C": "\\underline{...}",
      "D": "\\textit{...}"
    },
    "answer": "D"
  },
  {
    "id": 64,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "Which JavaScript engine is used inside Mozilla Firefox?",
    "options": {
      "A": "V8",
      "B": "SpiderMonkey",
      "C": "Rhino",
      "D": "Hermes"
    },
    "answer": "B"
  },
  {
    "id": 65,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "Which ATM method displays the current balance after validating the PIN?",
    "options": {
      "A": "withdrawMoney",
      "B": "validatePIN",
      "C": "checkBalance",
      "D": "ATM"
    },
    "answer": "C"
  },
  {
    "id": 66,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "The values that the attributes of an object take at a given time form the object's:",
    "options": {
      "A": "Destructor",
      "B": "Class name",
      "C": "State",
      "D": "Header"
    },
    "answer": "C"
  },
  {
    "id": 67,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "In VS Code, typing the exclamation mark (!) in an empty .html file and pressing Tab will:",
    "options": {
      "A": "Comment out the current line",
      "B": "Insert the basic HTML boilerplate code",
      "C": "Open the Extensions Marketplace",
      "D": "Format the document on save"
    },
    "answer": "B"
  },
  {
    "id": 68,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "hard",
    "question": "Which command creates a label that can be used for cross-referencing?",
    "options": {
      "A": "\\label{...}",
      "B": "\\ref{...}",
      "C": "\\caption{...}",
      "D": "\\tag{...}"
    },
    "answer": "A"
  },
  {
    "id": 69,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "How do you reference a separate JavaScript file named index.js from an HTML file?",
    "options": {
      "A": "<script src=\"index.js\"></script>",
      "B": "<import src=\"index.js\">",
      "C": "<link href=\"index.js\">",
      "D": "<js file=\"index.js\"></js>"
    },
    "answer": "A"
  },
  {
    "id": 70,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "hard",
    "question": "Which command inserts a horizontal line in a table?",
    "options": {
      "A": "\\hr",
      "B": "\\hline",
      "C": "\\line",
      "D": "\\border"
    },
    "answer": "B"
  },
  {
    "id": 71,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "Which command sets the caption of a figure?",
    "options": {
      "A": "\\ref{...}",
      "B": "\\label{...}",
      "C": "\\caption{...}",
      "D": "\\title{...}"
    },
    "answer": "C"
  },
  {
    "id": 72,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "What is the leading bit pattern of a Class A address?",
    "options": {
      "A": "0",
      "B": "10",
      "C": "1110",
      "D": "110"
    },
    "answer": "A"
  },
  {
    "id": 73,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "In IT security, a \"threat\" represents:",
    "options": {
      "A": "A hardware fault only",
      "B": "A potential security harm to an asset",
      "C": "A strong password",
      "D": "A firewall rule"
    },
    "answer": "B"
  },
  {
    "id": 74,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "Before ES6, what was the only way to declare variables in JavaScript?",
    "options": {
      "A": "int",
      "B": "const",
      "C": "let",
      "D": "var"
    },
    "answer": "D"
  },
  {
    "id": 75,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "hard",
    "question": "How is a subscript written in LaTeX math mode?",
    "options": {
      "A": "a/b",
      "B": "a_b",
      "C": "a^b",
      "D": "a*b"
    },
    "answer": "B"
  },
  {
    "id": 76,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "What is the most common example of a WAN?",
    "options": {
      "A": "A single-building network",
      "B": "A school lab network",
      "C": "A home network",
      "D": "The Internet"
    },
    "answer": "D"
  },
  {
    "id": 77,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "Which CSS rule removes the underline from links?",
    "options": {
      "A": "a { text-transform: none; }",
      "B": "a { font-style: normal; }",
      "C": "a { vertical-align: baseline; }",
      "D": "a { text-decoration: none; }"
    },
    "answer": "D"
  },
  {
    "id": 78,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "What does the search algorithm do?",
    "options": {
      "A": "Searches the index and finds the most suitable pages by matching keywords",
      "B": "Blocks websites",
      "C": "Downloads images",
      "D": "Creates new web pages"
    },
    "answer": "A"
  },
  {
    "id": 79,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "hard",
    "question": "In \\begin{tabular}{ c c c }, what does c mean?",
    "options": {
      "A": "The column is closed",
      "B": "The column is coloured",
      "C": "The column is counted",
      "D": "Text is centred in that column"
    },
    "answer": "D"
  },
  {
    "id": 80,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "What does a router do?",
    "options": {
      "A": "Forwards data between different networks",
      "B": "Stores web pages",
      "C": "Formats hard disks",
      "D": "Converts audio into text"
    },
    "answer": "A"
  },
  {
    "id": 81,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "Which of the following is a search engine rather than a web browser?",
    "options": {
      "A": "Bing",
      "B": "Chrome",
      "C": "Opera",
      "D": "Firefox"
    },
    "answer": "A"
  },
  {
    "id": 82,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "What happens to a variable that is assigned a value without using let, var or const?",
    "options": {
      "A": "It becomes a constant",
      "B": "It becomes an implicit global variable",
      "C": "It is block-scoped",
      "D": "It causes a SyntaxError"
    },
    "answer": "B"
  },
  {
    "id": 83,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "Which primitive data type holds only the values true or false?",
    "options": {
      "A": "Number",
      "B": "String",
      "C": "Symbol",
      "D": "Boolean"
    },
    "answer": "D"
  },
  {
    "id": 84,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "According to the lab, which declaration should you use by default when the value will not change?",
    "options": {
      "A": "const",
      "B": "let",
      "C": "var",
      "D": "function"
    },
    "answer": "A"
  },
  {
    "id": 85,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "A WAN covers a range of:",
    "options": {
      "A": "Above 50 km",
      "B": "Up to 500 m",
      "C": "Up to 2 km",
      "D": "5 km to 50 km"
    },
    "answer": "A"
  },
  {
    "id": 86,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "hard",
    "question": "Everything in the .tex file before \\begin{document} is called the:",
    "options": {
      "A": "Header file",
      "B": "Abstract",
      "C": "Preamble",
      "D": "Body"
    },
    "answer": "C"
  },
  {
    "id": 87,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "A web browser is an example of:",
    "options": {
      "A": "System hardware",
      "B": "Application software used to retrieve and view web pages",
      "C": "A network cable",
      "D": "A search algorithm"
    },
    "answer": "B"
  },
  {
    "id": 88,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "Which JavaScript engine is used inside the Google Chrome browser?",
    "options": {
      "A": "SpiderMonkey",
      "B": "Chakra",
      "C": "V8",
      "D": "Nitro"
    },
    "answer": "C"
  },
  {
    "id": 89,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "Which of the following cannot be used as a variable name?",
    "options": {
      "A": "if",
      "B": "_if",
      "C": "total",
      "D": "price"
    },
    "answer": "A"
  },
  {
    "id": 90,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "What does calc.add(1, 2, 3) print in the Calculator example?",
    "options": {
      "A": "7",
      "B": "3",
      "C": "6",
      "D": "123"
    },
    "answer": "C"
  },
  {
    "id": 91,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "Which private address range belongs to Class A?",
    "options": {
      "A": "10.0.0.0 to 10.255.255.255",
      "B": "192.168.0.0 to 192.168.255.255",
      "C": "127.0.0.0 to 127.255.255.255",
      "D": "172.16.0.0 to 172.31.255.255"
    },
    "answer": "A"
  },
  {
    "id": 92,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "Which declaration keyword allows re-declaring the same variable name in the same scope?",
    "options": {
      "A": "let and const",
      "B": "let",
      "C": "var",
      "D": "const"
    },
    "answer": "C"
  },
  {
    "id": 93,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "Connections between nodes in a computer network are established using:",
    "options": {
      "A": "Cable media or wireless media",
      "B": "Only satellite links",
      "C": "Only fibre-optic cable",
      "D": "Only Wi-Fi"
    },
    "answer": "A"
  },
  {
    "id": 94,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "In a UML class diagram, what do the symbols \"-\" and \"+\" before a member usually denote?",
    "options": {
      "A": "\"-\" private and \"+\" public",
      "B": "\"-\" static and \"+\" dynamic",
      "C": "\"-\" public and \"+\" private",
      "D": "\"-\" input and \"+\" output"
    },
    "answer": "A"
  },
  {
    "id": 95,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "Visual Studio Code is a source-code editor developed by which company?",
    "options": {
      "A": "Google",
      "B": "Microsoft",
      "C": "Oracle",
      "D": "Mozilla"
    },
    "answer": "B"
  },
  {
    "id": 96,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "Which of the three core front-end technologies defines the structure and content of a web page?",
    "options": {
      "A": "Node.js",
      "B": "JavaScript",
      "C": "CSS",
      "D": "HTML"
    },
    "answer": "D"
  },
  {
    "id": 97,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "hard",
    "question": "In a description list, which tag defines the name or term?",
    "options": {
      "A": "<dl>",
      "B": "<dt>",
      "C": "<dd>",
      "D": "<li>"
    },
    "answer": "B"
  },
  {
    "id": 98,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "hard",
    "question": "Which element is used to embed another web page inside the current page?",
    "options": {
      "A": "<canvas>",
      "B": "<template>",
      "C": "<picture>",
      "D": "<iframe>"
    },
    "answer": "D"
  },
  {
    "id": 99,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "Which header file is included in the examples for cin and cout?",
    "options": {
      "A": "stdio.h",
      "B": "iostream",
      "C": "string.h",
      "D": "fstream"
    },
    "answer": "B"
  },
  {
    "id": 100,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "Which keyword declares a block-scoped variable that was introduced in ES6 and can be reassigned but not re-declared in the same scope?",
    "options": {
      "A": "const",
      "B": "static",
      "C": "let",
      "D": "var"
    },
    "answer": "C"
  },
  {
    "id": 101,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "Which delimiter pair is used to write equations in display mode?",
    "options": {
      "A": "% ... %",
      "B": "$ ... $",
      "C": "\\[ ... \\]",
      "D": "# ... #"
    },
    "answer": "C"
  },
  {
    "id": 102,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "Overleaf is:",
    "options": {
      "A": "A desktop spreadsheet program",
      "B": "A JavaScript runtime",
      "C": "A network simulation tool",
      "D": "A collaborative cloud-based LaTeX editor"
    },
    "answer": "D"
  },
  {
    "id": 103,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "hard",
    "question": "Which environment is used (instead of figure) to caption and reference a table?",
    "options": {
      "A": "tabular",
      "B": "label",
      "C": "table",
      "D": "caption"
    },
    "answer": "C"
  },
  {
    "id": 104,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "In the Student class example, what does getRollNo() do?",
    "options": {
      "A": "Sets the value of rollNo",
      "B": "Returns the value of the private data member rollNo",
      "C": "Deletes the object",
      "D": "Declares rollNo"
    },
    "answer": "B"
  },
  {
    "id": 105,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "What is a computer network?",
    "options": {
      "A": "A telecommunications network that allows nodes to share resources and exchange data",
      "B": "A single computer running many programs",
      "C": "A software used only for browsing",
      "D": "A group of unconnected devices"
    },
    "answer": "A"
  },
  {
    "id": 106,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "Abstraction focuses on:",
    "options": {
      "A": "Combining data and methods",
      "B": "Deriving new classes",
      "C": "Presenting only the essential details while hiding the underlying complexity",
      "D": "Creating many forms of a function"
    },
    "answer": "C"
  },
  {
    "id": 107,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "Given let mixedArray = [1, \"hello\", true, {key: \"value\"}]; what does console.log(mixedArray[3]) print?",
    "options": {
      "A": "{ key: 'value' }",
      "B": "undefined",
      "C": "hello",
      "D": "true"
    },
    "answer": "A"
  },
  {
    "id": 108,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "hard",
    "question": "Which text-transform value makes the first letter of every word uppercase?",
    "options": {
      "A": "capitalize",
      "B": "lowercase",
      "C": "inherit",
      "D": "uppercase"
    },
    "answer": "A"
  },
  {
    "id": 109,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "Which two technologies are important in a LAN?",
    "options": {
      "A": "FDDI and ATM",
      "B": "Ethernet and Wi-Fi",
      "C": "CDDI and Bluetooth",
      "D": "Leased line and dial-up"
    },
    "answer": "B"
  },
  {
    "id": 110,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "Where should the <script> tag generally be placed in an HTML document, according to best practice?",
    "options": {
      "A": "Inside the <title> element",
      "B": "Inside the <head> only, always",
      "C": "At the very top, before <!DOCTYPE html>",
      "D": "At the end of the <body> section"
    },
    "answer": "D"
  },
  {
    "id": 111,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "In a JavaScript function, the return statement is:",
    "options": {
      "A": "Used to create a loop",
      "B": "Optional, and is used to send a value back to the caller",
      "C": "Used to declare parameters",
      "D": "Mandatory in every function"
    },
    "answer": "B"
  },
  {
    "id": 112,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "Which tag is used to highlight specific text on a page?",
    "options": {
      "A": "<ins>",
      "B": "<dfn>",
      "C": "<mark>",
      "D": "<del>"
    },
    "answer": "C"
  },
  {
    "id": 113,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "In JavaScript, an object is a collection of:",
    "options": {
      "A": "Boolean flags",
      "B": "Ordered numbers only",
      "C": "Only functions",
      "D": "Key-value pairs"
    },
    "answer": "D"
  },
  {
    "id": 114,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "In the Account example, which member is private?",
    "options": {
      "A": "accountNumber",
      "B": "balance",
      "C": "name",
      "D": "main"
    },
    "answer": "B"
  },
  {
    "id": 115,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "What is the purpose of \\usepackage{graphicx}?",
    "options": {
      "A": "It adds a table of contents",
      "B": "It allows images to be included in the document",
      "C": "It sets the paper size",
      "D": "It creates tables"
    },
    "answer": "B"
  },
  {
    "id": 116,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "What is the range of a MAN, according to the lab?",
    "options": {
      "A": "Up to 2 km",
      "B": "Above 50 km",
      "C": "5 km to 50 km",
      "D": "Up to 100 m"
    },
    "answer": "C"
  },
  {
    "id": 117,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "What happens when you try to reassign a variable declared with const?",
    "options": {
      "A": "The variable becomes undefined",
      "B": "TypeError: Assignment to constant variable",
      "C": "SyntaxError: unexpected token",
      "D": "The new value is ignored silently"
    },
    "answer": "B"
  },
  {
    "id": 118,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "In the Account example's main(), the name can be read directly into currentAccount.name because:",
    "options": {
      "A": "name is a public data member",
      "B": "name is a private data member",
      "C": "getline cannot use private data",
      "D": "main is a member function"
    },
    "answer": "A"
  },
  {
    "id": 119,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "In the procedural BMI program, the formula w/(h*h)*703 is used because weight and height are in:",
    "options": {
      "A": "Kilograms and metres",
      "B": "Pounds and feet",
      "C": "Pounds and inches",
      "D": "Kilograms and centimetres"
    },
    "answer": "C"
  },
  {
    "id": 120,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "Which <img> attribute provides alternative text that screen readers can read aloud?",
    "options": {
      "A": "alt",
      "B": "src",
      "C": "href",
      "D": "width"
    },
    "answer": "A"
  },
  {
    "id": 121,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "hard",
    "question": "WYSIWYM, the idea behind LaTeX, stands for:",
    "options": {
      "A": "What you see is where you move",
      "B": "What you see is what you make",
      "C": "What you see is what you mean",
      "D": "Write your style in Word, yield more"
    },
    "answer": "C"
  },
  {
    "id": 122,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "Which keyword is used to create a class in C++?",
    "options": {
      "A": "class",
      "B": "new",
      "C": "define",
      "D": "object"
    },
    "answer": "A"
  },
  {
    "id": 123,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "Inline math formulas can be written between which delimiters?",
    "options": {
      "A": "\\[ ... \\]",
      "B": "# ... #",
      "C": "% ... %",
      "D": "$ ... $"
    },
    "answer": "D"
  },
  {
    "id": 124,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "What is the range of Class C IP addresses?",
    "options": {
      "A": "224-239",
      "B": "128-191",
      "C": "192-223",
      "D": "1-127"
    },
    "answer": "C"
  },
  {
    "id": 125,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "Which three modes of inheritance are described in the lab?",
    "options": {
      "A": "public, private and protected",
      "B": "single, double and triple",
      "C": "static, dynamic and virtual",
      "D": "base, derived and friend"
    },
    "answer": "A"
  },
  {
    "id": 126,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "Which selector targets any element whose class attribute has the value \"note\"?",
    "options": {
      "A": "*note {}",
      "B": "note {}",
      "C": ".note {}",
      "D": "#note {}"
    },
    "answer": "C"
  },
  {
    "id": 127,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "Which of the following is an invalid JavaScript variable name?",
    "options": {
      "A": "$price",
      "B": "2price",
      "C": "var2",
      "D": "_name"
    },
    "answer": "B"
  },
  {
    "id": 128,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "Which topology is built from point-to-point connections and can be either full or partial?",
    "options": {
      "A": "Ring",
      "B": "Mesh",
      "C": "Star",
      "D": "Bus"
    },
    "answer": "B"
  },
  {
    "id": 129,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "What is the initial balance of myATM in the main function?",
    "options": {
      "A": "0",
      "B": "500.00",
      "C": "1000.00",
      "D": "1234"
    },
    "answer": "C"
  },
  {
    "id": 130,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "Which element holds metadata, links to CSS files and other information that is not displayed directly on the page?",
    "options": {
      "A": "<body>",
      "B": "<head>",
      "C": "<section>",
      "D": "<footer>"
    },
    "answer": "B"
  },
  {
    "id": 131,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "Which element displays text that has been removed from the document?",
    "options": {
      "A": "<small>",
      "B": "<mark>",
      "C": "<del>",
      "D": "<ins>"
    },
    "answer": "C"
  },
  {
    "id": 132,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "In the ATM example, what is printed if the balance is $0 and the user tries to withdraw 500 with the correct PIN?",
    "options": {
      "A": "Invalid PIN.",
      "B": "Current balance: $0",
      "C": "Withdrawal successful! Remaining balance: $0",
      "D": "Insufficient balance."
    },
    "answer": "D"
  },
  {
    "id": 133,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "hard",
    "question": "Which symbol separates the cells within a row of a LaTeX table?",
    "options": {
      "A": ",",
      "B": "&",
      "C": ";",
      "D": "#"
    },
    "answer": "B"
  },
  {
    "id": 134,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "Which command produces bold text?",
    "options": {
      "A": "\\underline{...}",
      "B": "\\emph{...}",
      "C": "\\textit{...}",
      "D": "\\textbf{...}"
    },
    "answer": "D"
  },
  {
    "id": 135,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "Which PIN is stored as correctPIN in the ATM class?",
    "options": {
      "A": "1234",
      "B": "1000",
      "C": "123",
      "D": "4321"
    },
    "answer": "A"
  },
  {
    "id": 136,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "LaTeX is mainly used to:",
    "options": {
      "A": "Build mobile games",
      "B": "Create professional-looking documents",
      "C": "Design network topologies",
      "D": "Edit photographs"
    },
    "answer": "B"
  },
  {
    "id": 137,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "Which example is given in the lab for operator overloading?",
    "options": {
      "A": "Using constructors",
      "B": "Using + to concatenate strings",
      "C": "Using virtual functions",
      "D": "Using header files"
    },
    "answer": "B"
  },
  {
    "id": 138,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "Which quotation style allows string interpolation such as `Welcome, ${name}`?",
    "options": {
      "A": "Single quotes",
      "B": "Angle brackets",
      "C": "Double quotes",
      "D": "Backticks"
    },
    "answer": "D"
  },
  {
    "id": 139,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "Which command includes an image in LaTeX?",
    "options": {
      "A": "\\image{...}",
      "B": "\\graphics{...}",
      "C": "\\insertimage{...}",
      "D": "\\includegraphics{...}"
    },
    "answer": "D"
  },
  {
    "id": 140,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "In the Shape example, after setHeight(5) and setWidth(2), what does getHeight() return?",
    "options": {
      "A": "2",
      "B": "5",
      "C": "10",
      "D": "7"
    },
    "answer": "B"
  },
  {
    "id": 141,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "Which real-world example does the lab give for something that should be private?",
    "options": {
      "A": "A person's Social Security Number, salary or age",
      "B": "A class's header",
      "C": "A company's public address",
      "D": "A person's name"
    },
    "answer": "A"
  },
  {
    "id": 142,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "hard",
    "question": "Which command creates an unnumbered section?",
    "options": {
      "A": "\\unsection{Title}",
      "B": "\\subsection{Title}",
      "C": "\\section*{Title}",
      "D": "\\section{Title}*"
    },
    "answer": "C"
  },
  {
    "id": 143,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "Which command is used to write an integral?",
    "options": {
      "A": "\\sum",
      "B": "\\integral",
      "C": "\\int",
      "D": "\\lim"
    },
    "answer": "C"
  },
  {
    "id": 144,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "hard",
    "question": "For SEO purposes, how many <h1> elements should a page ideally contain?",
    "options": {
      "A": "At least six",
      "B": "None",
      "C": "One per paragraph",
      "D": "Only one"
    },
    "answer": "D"
  },
  {
    "id": 145,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "hard",
    "question": "Where do the \\title, \\author and \\date commands go?",
    "options": {
      "A": "After \\end{document}",
      "B": "Inside a table",
      "C": "In the preamble, before \\begin{document}",
      "D": "Inside the abstract"
    },
    "answer": "C"
  },
  {
    "id": 146,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "Which command begins each entry in an itemize or enumerate list?",
    "options": {
      "A": "\\li",
      "B": "\\item",
      "C": "\\entry",
      "D": "\\bullet"
    },
    "answer": "B"
  },
  {
    "id": 147,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "In the CIA triad, which term means data is not modified or deleted by unauthorized parties?",
    "options": {
      "A": "Accountability",
      "B": "Integrity",
      "C": "Confidentiality",
      "D": "Availability"
    },
    "answer": "B"
  },
  {
    "id": 148,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "hard",
    "question": "The general sibling selector h1 ~ p {} applies to:",
    "options": {
      "A": "Only the very next <p> after the <h1>",
      "B": "<p> elements nested inside <h1>",
      "C": "Every <h1> that follows a <p>",
      "D": "All <p> siblings that follow an <h1>"
    },
    "answer": "D"
  },
  {
    "id": 149,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "Which topology connects every computer to a single cable and is bi-directional?",
    "options": {
      "A": "Ring",
      "B": "Star",
      "C": "Bus",
      "D": "Mesh"
    },
    "answer": "C"
  },
  {
    "id": 150,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "What is Cisco Packet Tracer?",
    "options": {
      "A": "A web browser",
      "B": "A network simulation and visualization tool",
      "C": "A text editor",
      "D": "A programming language"
    },
    "answer": "B"
  },
  {
    "id": 151,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "What is a search engine?",
    "options": {
      "A": "A type of virus scanner",
      "B": "A hardware device for routing",
      "C": "A website through which users search the content available on the Internet",
      "D": "A program that repairs broken links"
    },
    "answer": "C"
  },
  {
    "id": 152,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "Which are the three main components of a search engine?",
    "options": {
      "A": "Server, client and browser",
      "B": "Crawler, index and search algorithm",
      "C": "Header, body and footer",
      "D": "Router, switch and hub"
    },
    "answer": "B"
  },
  {
    "id": 153,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "Which extension launches a local development server that reloads the browser automatically on every save?",
    "options": {
      "A": "Format Document",
      "B": "Live Server",
      "C": "Prettier",
      "D": "Code Runner"
    },
    "answer": "B"
  },
  {
    "id": 154,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "Which companies are mentioned in the lab as building internal applications around JavaScript?",
    "options": {
      "A": "Tesla, Boeing and Nokia",
      "B": "Intel, AMD and Nvidia",
      "C": "Netflix, Walmart and PayPal",
      "D": "Oracle, SAP and IBM"
    },
    "answer": "C"
  },
  {
    "id": 155,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "Which command is used for fractions in math mode?",
    "options": {
      "A": "\\frac{a}{b}",
      "B": "\\fract{a}{b}",
      "C": "\\slash{a}{b}",
      "D": "\\div{a}{b}"
    },
    "answer": "A"
  },
  {
    "id": 156,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "hard",
    "question": "Which table tag groups the footer content of a table?",
    "options": {
      "A": "<caption>",
      "B": "<tbody>",
      "C": "<tfoot>",
      "D": "<thead>"
    },
    "answer": "C"
  },
  {
    "id": 157,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "Which private address range belongs to Class B?",
    "options": {
      "A": "192.168.0.0 to 192.168.255.255",
      "B": "128.0.0.0 to 128.255.255.255",
      "C": "172.16.0.0 to 172.31.255.255",
      "D": "10.0.0.0 to 10.255.255.255"
    },
    "answer": "C"
  },
  {
    "id": 158,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "Encapsulation means:",
    "options": {
      "A": "Bundling data and the methods that operate on it into a single unit",
      "B": "Hiding the whole program from the user",
      "C": "Converting code to machine language",
      "D": "Creating multiple copies of an object"
    },
    "answer": "A"
  },
  {
    "id": 159,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "In the to-do list program, which property is used in the for-loop condition to go through all tasks?",
    "options": {
      "A": "tasks.size",
      "B": "tasks.length",
      "C": "tasks.count",
      "D": "tasks.total"
    },
    "answer": "B"
  },
  {
    "id": 160,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "Which environment is used to caption, label and reference images?",
    "options": {
      "A": "image",
      "B": "graphic",
      "C": "picture",
      "D": "figure"
    },
    "answer": "D"
  },
  {
    "id": 161,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "Which overload of add() is called for calc.add(2.5, 3.5) in the Calculator example?",
    "options": {
      "A": "add(int a, int b, int c)",
      "B": "None, it causes an error",
      "C": "add(int a, int b)",
      "D": "add(double a, double b)"
    },
    "answer": "D"
  },
  {
    "id": 162,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "hard",
    "question": "The selector h1 + p {} targets:",
    "options": {
      "A": "The first <p> immediately after an <h1>",
      "B": "All <p> siblings of an <h1>",
      "C": "Every <p> nested inside an <h1>",
      "D": "The <h1> that precedes a <p>"
    },
    "answer": "A"
  },
  {
    "id": 163,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "Which technologies does a MAN mainly use?",
    "options": {
      "A": "Bluetooth and NFC",
      "B": "Leased line and dial-up",
      "C": "Ethernet and Wi-Fi",
      "D": "FDDI, CDDI and ATM"
    },
    "answer": "D"
  },
  {
    "id": 164,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "An ID selector is written by placing which symbol before the id value?",
    "options": {
      "A": "~ (tilde)",
      "B": "* (asterisk)",
      "C": ". (full stop)",
      "D": "# (hash)"
    },
    "answer": "D"
  },
  {
    "id": 165,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "When we define a variable of a class type in C++, this is called:",
    "options": {
      "A": "Overloading the class",
      "B": "Inheriting the class",
      "C": "Instantiating the class",
      "D": "Compiling the class"
    },
    "answer": "C"
  },
  {
    "id": 166,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "Which menu option exits the ATM program?",
    "options": {
      "A": "1",
      "B": "0",
      "C": "2",
      "D": "3"
    },
    "answer": "D"
  },
  {
    "id": 167,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "What is the role of the index in a search engine?",
    "options": {
      "A": "It stores URLs, links and keywords to make search results more effective",
      "B": "It displays advertisements",
      "C": "It scans websites automatically",
      "D": "It is the search box the user types in"
    },
    "answer": "A"
  },
  {
    "id": 168,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "What is a protocol in networking?",
    "options": {
      "A": "A physical cable type",
      "B": "A security guard program",
      "C": "A kind of web browser",
      "D": "A set of rules that dictates how data is transmitted and received"
    },
    "answer": "D"
  },
  {
    "id": 169,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "Which technologies are used in a WAN according to the lab?",
    "options": {
      "A": "Ethernet and Wi-Fi",
      "B": "Leased line and dial-up",
      "C": "FDDI and CDDI",
      "D": "Bluetooth and infrared"
    },
    "answer": "B"
  },
  {
    "id": 170,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "How many primitive data types does JavaScript have, as listed in the lab?",
    "options": {
      "A": "6",
      "B": "7",
      "C": "9",
      "D": "5"
    },
    "answer": "B"
  },
  {
    "id": 171,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "In the CIA triad, which term means preventing sensitive information from unauthorized access?",
    "options": {
      "A": "Confidentiality",
      "B": "Availability",
      "C": "Integrity",
      "D": "Authentication"
    },
    "answer": "A"
  },
  {
    "id": 172,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "How is a single-line comment written in JavaScript?",
    "options": {
      "A": "// comment",
      "B": "/* comment",
      "C": "<!-- comment -->",
      "D": "# comment"
    },
    "answer": "A"
  },
  {
    "id": 173,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "What can JavaScript be used to build, according to the lab?",
    "options": {
      "A": "Only operating-system drivers",
      "B": "Web and mobile apps, real-time networking apps, command-line tools and games",
      "C": "Only static web pages",
      "D": "Only browser animations"
    },
    "answer": "B"
  },
  {
    "id": 174,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "If rollNo is a private data member of Student, what happens when main() executes A.rollNo = 1;?",
    "options": {
      "A": "rollNo becomes 0",
      "B": "Only a runtime warning",
      "C": "rollNo becomes 1",
      "D": "A compile-time error"
    },
    "answer": "D"
  },
  {
    "id": 175,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "Function overloading happens when:",
    "options": {
      "A": "Several functions share the same name but have different parameters",
      "B": "A function has no parameters",
      "C": "A function calls itself",
      "D": "A derived class replaces a base class function"
    },
    "answer": "A"
  },
  {
    "id": 176,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "What does CSS stand for?",
    "options": {
      "A": "Cascading Script Structure",
      "B": "Computer Styling System",
      "C": "Cascading Style Sheets",
      "D": "Creative Style Syntax"
    },
    "answer": "C"
  },
  {
    "id": 177,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "Which class of IP addresses is reserved for experimental use and research?",
    "options": {
      "A": "Class C",
      "B": "Class E (240-255)",
      "C": "Class A",
      "D": "Class D"
    },
    "answer": "B"
  },
  {
    "id": 178,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "Which tag attaches an external stylesheet to an HTML page?",
    "options": {
      "A": "<style src=\"styles.css\">",
      "B": "<css href=\"styles.css\">",
      "C": "<link rel=\"stylesheet\" href=\"styles.css\">",
      "D": "<script src=\"styles.css\">"
    },
    "answer": "C"
  },
  {
    "id": 179,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "In the to-do list program, which array method adds a new task to the end of the tasks array?",
    "options": {
      "A": "splice()",
      "B": "slice()",
      "C": "pop()",
      "D": "push()"
    },
    "answer": "D"
  },
  {
    "id": 180,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "Which heading tag represents the least important heading?",
    "options": {
      "A": "<head>",
      "B": "<h1>",
      "C": "<h3>",
      "D": "<h6>"
    },
    "answer": "D"
  },
  {
    "id": 181,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "Which selector applies its rules to every element on the page?",
    "options": {
      "A": "* {}",
      "B": "# {}",
      "C": "all {}",
      "D": ". {}"
    },
    "answer": "A"
  },
  {
    "id": 182,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "hard",
    "question": "What is \\addcontentsline used for?",
    "options": {
      "A": "Adding a new page",
      "B": "Inserting a figure",
      "C": "Setting the font",
      "D": "Manually adding entries to the table of contents"
    },
    "answer": "D"
  },
  {
    "id": 183,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "What does HTML stand for?",
    "options": {
      "A": "Hyperlink and Text Management Language",
      "B": "Hyper Text Markup Language",
      "C": "Hyper Transfer Markup Language",
      "D": "High Text Machine Language"
    },
    "answer": "B"
  },
  {
    "id": 184,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "A valid JavaScript variable name must start with:",
    "options": {
      "A": "A hyphen (-)",
      "B": "A hash (#)",
      "C": "A letter, underscore (_) or dollar sign ($)",
      "D": "A digit"
    },
    "answer": "C"
  },
  {
    "id": 185,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "What is the range of Class B IP addresses?",
    "options": {
      "A": "192-223",
      "B": "1-127",
      "C": "240-255",
      "D": "128-191"
    },
    "answer": "D"
  },
  {
    "id": 186,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "Which environment is the default LaTeX method for creating tables?",
    "options": {
      "A": "table-grid",
      "B": "matrix",
      "C": "tabs",
      "D": "tabular"
    },
    "answer": "D"
  },
  {
    "id": 187,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "Which command declares the type of document, such as article?",
    "options": {
      "A": "\\documentclass{article}",
      "B": "\\title{article}",
      "C": "\\usepackage{article}",
      "D": "\\begin{article}"
    },
    "answer": "A"
  },
  {
    "id": 188,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "hard",
    "question": "Which command is replaced by the number of a labelled figure?",
    "options": {
      "A": "\\label{...}",
      "B": "\\ref{...}",
      "C": "\\caption{...}",
      "D": "\\cite{...}"
    },
    "answer": "B"
  },
  {
    "id": 189,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "How is a superscript written in LaTeX math mode?",
    "options": {
      "A": "a#b",
      "B": "a_b",
      "C": "a^b",
      "D": "a%b"
    },
    "answer": "C"
  },
  {
    "id": 190,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "What is network topology?",
    "options": {
      "A": "The speed of the Internet connection",
      "B": "The length of a network cable",
      "C": "The arrangement of the various elements (links, nodes, etc.) of a network",
      "D": "The brand of the router"
    },
    "answer": "C"
  },
  {
    "id": 191,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "Which environment creates a numbered (ordered) list?",
    "options": {
      "A": "orderedlist",
      "B": "enumerate",
      "C": "itemize",
      "D": "numbered"
    },
    "answer": "B"
  },
  {
    "id": 192,
    "type": "mcq",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "In the lab analogy, if a class is the sketch (prototype) of a house, what is the house?",
    "options": {
      "A": "The data member",
      "B": "The function",
      "C": "The header file",
      "D": "The object"
    },
    "answer": "D"
  },
  {
    "id": 193,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "hard",
    "question": "Which command starts a new line in a LaTeX table?",
    "options": {
      "A": "\\newrow",
      "B": "&&",
      "C": "\\n",
      "D": "\\\\"
    },
    "answer": "D"
  },
  {
    "id": 194,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "What happens if you write let score = 10; and then let score = 20; in the same scope?",
    "options": {
      "A": "SyntaxError: the identifier has already been declared",
      "B": "The value stays 10",
      "C": "The value silently becomes 20",
      "D": "TypeError: assignment to constant variable"
    },
    "answer": "A"
  },
  {
    "id": 195,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "How is a comment written in CSS?",
    "options": {
      "A": "/* comment */",
      "B": "# comment",
      "C": "<!-- comment -->",
      "D": "// comment"
    },
    "answer": "A"
  },
  {
    "id": 196,
    "type": "mcq",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "For a RADIO object, which of the following is an example of a data member (attribute)?",
    "options": {
      "A": "Switching it on",
      "B": "Volume setting",
      "C": "Setting the station",
      "D": "Tuning in a channel"
    },
    "answer": "B"
  },
  {
    "id": 197,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "hard",
    "question": "What is the default font size if none is specified in \\documentclass?",
    "options": {
      "A": "10pt",
      "B": "11pt",
      "C": "9pt",
      "D": "12pt"
    },
    "answer": "A"
  },
  {
    "id": 198,
    "type": "mcq",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "Which command creates a new numbered section called Introduction?",
    "options": {
      "A": "\\chapter{Introduction}",
      "B": "\\title{Introduction}",
      "C": "\\item{Introduction}",
      "D": "\\section{Introduction}"
    },
    "answer": "D"
  },
  {
    "id": 199,
    "type": "mcq",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "Which version of Node.js does the lab ask you to download and install?",
    "options": {
      "A": "Canary",
      "B": "LTS",
      "C": "Nightly",
      "D": "Beta"
    },
    "answer": "B"
  },
  {
    "id": 200,
    "type": "mcq",
    "topic": "HTML & CSS",
    "difficulty": "hard",
    "question": "What does the &nbsp; HTML entity do?",
    "options": {
      "A": "Removes extra spaces from the text",
      "B": "Draws a horizontal line",
      "C": "Starts a new paragraph",
      "D": "Inserts a non-breaking space that keeps two words together"
    },
    "answer": "D"
  }
];

export const TF_BANK: TfQuestion[] = [
  {
    "id": 201,
    "type": "tf",
    "topic": "LaTeX",
    "difficulty": "hard",
    "question": "The \\part and \\chapter commands are available in the article document class.",
    "answer": false
  },
  {
    "id": 202,
    "type": "tf",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "Runtime polymorphism is achieved through function overloading.",
    "answer": false
  },
  {
    "id": 203,
    "type": "tf",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "The DOM is tied exclusively to JavaScript and cannot be used with any other language.",
    "answer": false
  },
  {
    "id": 204,
    "type": "tf",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "A getter function should be declared private so that outside code cannot read the data member.",
    "answer": false
  },
  {
    "id": 205,
    "type": "tf",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "If two variables reference the same object, a change made through one variable is also visible through the other.",
    "answer": true
  },
  {
    "id": 206,
    "type": "tf",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "With protected inheritance, a base class member that was public becomes protected in the derived class.",
    "answer": true
  },
  {
    "id": 207,
    "type": "tf",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "In a bus topology, a failure of the backbone cable brings the whole topology down.",
    "answer": true
  },
  {
    "id": 208,
    "type": "tf",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "In the ATM example, validatePIN() is a private method, so main() cannot call it directly.",
    "answer": true
  },
  {
    "id": 209,
    "type": "tf",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "Using an <h2> on a page that has no <h1> is discouraged because it breaks the logical heading structure.",
    "answer": true
  },
  {
    "id": 210,
    "type": "tf",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "The <q> tag automatically creates quotation marks around text, while <blockquote> is meant for a quotation taken from another source.",
    "answer": true
  },
  {
    "id": 211,
    "type": "tf",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "Members of a C++ class are public by default.",
    "answer": false
  },
  {
    "id": 212,
    "type": "tf",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "Compile-time polymorphism is also known as late binding.",
    "answer": false
  },
  {
    "id": 213,
    "type": "tf",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "HTML tags are case sensitive, so <B> and <b> are treated as two different tags.",
    "answer": false
  },
  {
    "id": 214,
    "type": "tf",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "Instantiating a class allocates memory for the object.",
    "answer": true
  },
  {
    "id": 215,
    "type": "tf",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "JavaScript code can run only inside a web browser.",
    "answer": false
  },
  {
    "id": 216,
    "type": "tf",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "In JavaScript, null and undefined mean exactly the same thing.",
    "answer": false
  },
  {
    "id": 217,
    "type": "tf",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "In a ring topology, data can travel in only one direction.",
    "answer": false
  },
  {
    "id": 218,
    "type": "tf",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "In a UML class diagram, the top compartment is for the class name, the second for variables and the third for methods.",
    "answer": true
  },
  {
    "id": 219,
    "type": "tf",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "In the ATM example, both withdrawMoney() and checkBalance() validate the PIN before doing their work.",
    "answer": true
  },
  {
    "id": 220,
    "type": "tf",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "Many math mode commands require the amsmath package to be included.",
    "answer": true
  },
  {
    "id": 221,
    "type": "tf",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "A ping result showing 4 packets sent and 4 packets received indicates that the target is reachable.",
    "answer": true
  },
  {
    "id": 222,
    "type": "tf",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "An IP address is used both to identify a host or network and to help route data across the Internet.",
    "answer": true
  },
  {
    "id": 223,
    "type": "tf",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "The <ins> element defines a word inserted into the document and displays it underlined.",
    "answer": true
  },
  {
    "id": 224,
    "type": "tf",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "Abstraction in header files lets us use functions such as pow() without knowing the algorithm behind them.",
    "answer": true
  },
  {
    "id": 225,
    "type": "tf",
    "topic": "HTML & CSS",
    "difficulty": "hard",
    "question": "In the viewport meta tag, initial-scale=1.0 is what makes the page width equal to the device screen width.",
    "answer": false
  },
  {
    "id": 226,
    "type": "tf",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "A <p> element automatically gets space (margin) before and after it, which helps lay out content neatly.",
    "answer": true
  },
  {
    "id": 227,
    "type": "tf",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "ECMAScript is a specification, while JavaScript is a programming language that conforms to that specification.",
    "answer": true
  },
  {
    "id": 228,
    "type": "tf",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "A MAN covers a smaller geographical area than a LAN.",
    "answer": false
  },
  {
    "id": 229,
    "type": "tf",
    "topic": "HTML & CSS",
    "difficulty": "hard",
    "question": "The child selector li > a also matches <a> elements nested deeper inside an <li>, for example inside a <span> within the <li>.",
    "answer": false
  },
  {
    "id": 230,
    "type": "tf",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "Compared with a LAN, a WAN generally has lower transmission speed and higher maintenance cost.",
    "answer": true
  },
  {
    "id": 231,
    "type": "tf",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "The setter function returns the value of a private data member, while the getter function assigns a new value to it.",
    "answer": false
  },
  {
    "id": 232,
    "type": "tf",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "The statement let age; (without a value) is valid, but const age; is not.",
    "answer": true
  },
  {
    "id": 233,
    "type": "tf",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "In the Account example, main() reads the balance directly using currentAccount.balance.",
    "answer": false
  },
  {
    "id": 234,
    "type": "tf",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "A switch forwards data to the intended device by using IP addresses.",
    "answer": false
  },
  {
    "id": 235,
    "type": "tf",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "In LaTeX, a comment is created by placing // at the beginning of the line.",
    "answer": false
  },
  {
    "id": 236,
    "type": "tf",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "A variable declared with var inside a function can be accessed from outside that function.",
    "answer": false
  },
  {
    "id": 237,
    "type": "tf",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "The \\maketitle command is placed in the body of the document, at the place where the title should be printed.",
    "answer": true
  },
  {
    "id": 238,
    "type": "tf",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "Variables declared with let are not hoisted in any way.",
    "answer": false
  },
  {
    "id": 239,
    "type": "tf",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "A const array can still have its elements modified, but the variable cannot be reassigned to a new array.",
    "answer": true
  },
  {
    "id": 240,
    "type": "tf",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "Inline expansion of a function reduces the overhead of function calling.",
    "answer": true
  },
  {
    "id": 241,
    "type": "tf",
    "topic": "LaTeX",
    "difficulty": "hard",
    "question": "In a tabular environment with 3 columns, every row must contain exactly three & symbols.",
    "answer": false
  },
  {
    "id": 242,
    "type": "tf",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "An image file name used with \\includegraphics should not contain white spaces or multiple dots.",
    "answer": true
  },
  {
    "id": 243,
    "type": "tf",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "The <b> tag adds more semantic importance to text than the <strong> tag does.",
    "answer": false
  },
  {
    "id": 244,
    "type": "tf",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "A derived class acquires the properties of the base class by modifying the base class.",
    "answer": false
  },
  {
    "id": 245,
    "type": "tf",
    "topic": "LaTeX",
    "difficulty": "hard",
    "question": "The $$ ... $$ delimiter is the recommended way to display equations in LaTeX.",
    "answer": false
  },
  {
    "id": 246,
    "type": "tf",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "In a star topology, data sent from any node must pass through the central node to reach its destination.",
    "answer": true
  },
  {
    "id": 247,
    "type": "tf",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "In private inheritance, the public members of the base class become protected in the derived class.",
    "answer": false
  },
  {
    "id": 248,
    "type": "tf",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "Class D addresses (224-239) are reserved for experimental research purposes.",
    "answer": false
  },
  {
    "id": 249,
    "type": "tf",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "Overleaf automatically compiles the document twice, so references and labels work without manual recompiling.",
    "answer": true
  },
  {
    "id": 250,
    "type": "tf",
    "topic": "LaTeX",
    "difficulty": "hard",
    "question": "Inside italicized text, \\emph reverses its behaviour and makes the emphasized word upright.",
    "answer": true
  }
];

export const FIB_BANK: FibQuestion[] = [
  {
    "id": 251,
    "type": "fib",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "The ______ element defines a self-contained container for images, diagrams and code snippets, and <figcaption> gives it a caption.",
    "answer": "figure"
  },
  {
    "id": 252,
    "type": "fib",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "The two types of abstraction are data abstraction and ______ abstraction.",
    "answer": "control"
  },
  {
    "id": 253,
    "type": "fib",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "To define a member function outside the class definition, the ______ operator (::) is used along with the class name.",
    "answer": "scope resolution"
  },
  {
    "id": 254,
    "type": "fib",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "The ______ keyword in a base class method (such as makeSound() in Animal) enables function overriding in derived classes.",
    "answer": "virtual"
  },
  {
    "id": 255,
    "type": "fib",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "By convention, the name of a user-defined class begins with a ______ letter.",
    "answer": "capital"
  },
  {
    "id": 256,
    "type": "fib",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "The ______ element is used to wrap navigation links.",
    "answer": "nav"
  },
  {
    "id": 257,
    "type": "fib",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "The ______ tag defines superscripted text, while <sub> defines subscripted text.",
    "answer": "sup"
  },
  {
    "id": 258,
    "type": "fib",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "When you run the ping command, it sends ICMP ______ requests to the target.",
    "answer": "echo"
  },
  {
    "id": 259,
    "type": "fib",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "In the vehicle example, Vehicle is the ______ class, while Bus, Car and Truck are derived classes.",
    "answer": "base"
  },
  {
    "id": 260,
    "type": "fib",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "In the ATM example, the ______ initializes the account balance when the object myATM is created.",
    "answer": "constructor"
  },
  {
    "id": 261,
    "type": "fib",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "The ______ environment places a brief overview of the main subject at the top of a LaTeX document.",
    "answer": "abstract"
  },
  {
    "id": 262,
    "type": "fib",
    "topic": "JavaScript",
    "difficulty": "hard",
    "question": "In the to-do list program, the ______ method of an array is used to remove an element at a given index.",
    "answer": "splice"
  },
  {
    "id": 263,
    "type": "fib",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "A ______ value is created by appending the letter n to the end of an integer and represents larger integers.",
    "answer": "BigInt"
  },
  {
    "id": 264,
    "type": "fib",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "Encapsulation is achieved through classes and ______ modifiers.",
    "answer": "access"
  },
  {
    "id": 265,
    "type": "fib",
    "topic": "JavaScript",
    "difficulty": "easy",
    "question": "In 2015 ECMA released ECMAScript 2015, which is also known as ES______.",
    "answer": "6"
  },
  {
    "id": 266,
    "type": "fib",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "Use \\______ inside the \\date{} command so that the date updates automatically when the document is compiled.",
    "answer": "today"
  },
  {
    "id": 267,
    "type": "fib",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "The ______ command, typed in Command Prompt, displays the IP configuration of all network interfaces on a Windows computer.",
    "answer": "ipconfig"
  },
  {
    "id": 268,
    "type": "fib",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "The public data members of an object are accessed using the direct member access operator, written as ______.",
    "answer": "dot (.)"
  },
  {
    "id": 269,
    "type": "fib",
    "topic": "Networking",
    "difficulty": "hard",
    "question": "The Class C private address range begins at ______ and ends at 192.168.255.255.",
    "answer": "192.168.0.0"
  },
  {
    "id": 270,
    "type": "fib",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "A variable that has been declared but not assigned any value holds the value ______.",
    "answer": "undefined"
  },
  {
    "id": 271,
    "type": "fib",
    "topic": "Networking",
    "difficulty": "easy",
    "question": "A ______ is a logical division of an IP network into smaller, more manageable networks.",
    "answer": "subnet"
  },
  {
    "id": 272,
    "type": "fib",
    "topic": "OOP",
    "difficulty": "hard",
    "question": "The command \\______ generates the table of contents automatically.",
    "answer": "tableofcontents"
  },
  {
    "id": 273,
    "type": "fib",
    "topic": "HTML & CSS",
    "difficulty": "easy",
    "question": "The <summary> element defines a visible heading for the ______ element.",
    "answer": "details"
  },
  {
    "id": 274,
    "type": "fib",
    "topic": "LaTeX",
    "difficulty": "easy",
    "question": "Unordered (bulleted) lists in LaTeX are created with the ______ environment.",
    "answer": "itemize"
  },
  {
    "id": 275,
    "type": "fib",
    "topic": "OOP",
    "difficulty": "easy",
    "question": "Both the getter and the setter function of a private data member must be defined as ______.",
    "answer": "public"
  }
];
