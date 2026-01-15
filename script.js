
const chatbot = document.getElementById("chatbot");
const toggleBtn = document.getElementById("chatbot-toggle");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBody = document.getElementById("chatbot-body");

// Contact form
const contactForm = document.getElementById("contact-form");

// Conversation state and memory
const conversationState = {
  userName: null,
  lastTopic: null,
  conversationDepth: 0,
  mood: "neutral"
};

// Conversation memory
let conversationMemory = [];

// Open / Close chatbot
toggleBtn.addEventListener("click", () => {
  chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
  if (chatbot.style.display === "flex") {
    userInput.focus();
  }
});

// ================= ENHANCED RESPONSE SYSTEM =================
function getDeepResponse(message) {
  const msg = message.toLowerCase().trim();
  const now = new Date();
  const time = now.getHours();
  const greeting = time < 12 ? "Good morning" : time < 18 ? "Good afternoon" : "Good evening";

  // Store user message in memory
  conversationMemory.push({
    user: message,
    timestamp: now.toISOString(),
    context: { ...conversationState }
  });

  // Check for introduction/name
  if (msg.includes("my name is") || msg.includes("i am") || msg.includes("i'm")) {
    const nameMatch = msg.match(/(?:my name is|i am|i'm) (\w+)/i);
    if (nameMatch && nameMatch[1]) {
      conversationState.userName = nameMatch[1];
      return `Nice to meet you, ${conversationState.userName}! I'm Anu's designa, an aspiring Full Stack Developer. What would you like to know about me? You can ask about my skills, projects, or experience.`;
    }
  }

  // Personalized greeting if we know the name
  if ((msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) && conversationState.userName) {
    conversationState.conversationDepth++;
    return `${greeting} ${conversationState.userName}! 👋 I'm Anu's design, glad you're here. What aspect of my work interests you today? We could discuss technology, projects, or my career journey.`;
  }

  if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
    return `${greeting}! 👋 I'm Anu's design
  , your interactive portfolio assistant. Before we dive in, may I know your name? Or you can jump right in and ask about my skills, projects, or experience!`;
  }

  // Skills - Deep version
  if (msg.includes("skill") || msg.includes("what can you do") || msg.includes("technolog")) {
    conversationState.lastTopic = "skills";
    conversationState.conversationDepth++;
    
    const followUps = [
      "I'd love to discuss any of these technologies in more depth. Which one interests you most?",
      "Each of these skills represents a different aspect of my approach to problem-solving. Would you like me to elaborate on any specific area?",
      "These skills form the foundation of my technical capabilities. What aspect would you like to explore further?"
    ];
    
    const baseResponse = `I have a diverse skill set that spans multiple domains:\n\n` +
      `💻 **Programming Languages**: Python, C, C++, Java\n` +
      `🌐 **Web Development**: HTML5, CSS3, JavaScript, Django, PHP, MySQL\n` +
      `🤖 **Specializations**: Machine Learning, Data Analytics\n` +
      `🛠️ **Tools**: Anaconda Navigator, Jupyter Notebook, MS Office, VS Code\n\n` +
      `${followUps[conversationState.conversationDepth % followUps.length]}`;
    
    return baseResponse;
  }

  // Education
  if (msg.includes("education") || msg.includes("degree") || msg.includes("college")) {
    conversationState.lastTopic = "education";
    conversationState.conversationDepth++;
    
    return `My educational background:\n\n` +
      `🎓 **B.Sc Computer Science**\n` +
      `   Sri Manakula Vinayagar Engineering College\n` +
      `   CGPA: 8.86\n\n` +
      `📚 **Higher Secondary Education**\n` +
      `   Achariya Siksha Mandir\n` +
      `   Percentage: 74.333%\n\n` +
      `🏫 **SSLC**\n` +
      `   Sri Ramachandra Vidyalaya High School\n` +
      `   Percentage: 94.6%\n\n` +
      `My strong academic foundation fuels my passion for technology and problem-solving.`;
  }

  // Projects - Deep version
  if (msg.includes("project") || msg.includes("work") || msg.includes("portfolio")) {
    conversationState.lastTopic = "projects";
    conversationState.conversationDepth++;
    
    const projects = [
      {
        name: "Digital Marketing Agency Website",
        desc: "Full-stack platform built with Python and PHP, successfully integrated backend with frontend for seamless user experience",
        tech: "Python, PHP, HTML, CSS, JavaScript, MySQL",
        challenge: "Integrating PHP backend with Python frontend components"
      },
      {
        name: "Heart Attack Prediction System",
        desc: "Machine Learning model for heart attack risk prediction using real-world data in Jupyter Notebook",
        tech: "Python, Pandas, Scikit-learn, Matplotlib",
        challenge: "Data preprocessing and feature selection for accurate predictions"
      },
      {
        name: "HR Analytics Dashboard",
        desc: "Interactive dashboard providing insights on employee trends and workforce optimization using Kaggle datasets",
        tech: "Python, Data Analytics, Visualization Tools",
        challenge: "Presenting complex HR data in an understandable format"
      }
    ];
    
    const randomProject = projects[conversationState.conversationDepth % projects.length];
    
    return `I've worked on several meaningful projects. One that stands out is the **${randomProject.name}**.\n\n` +
      `📋 **Description**: ${randomProject.desc}\n` +
      `⚡ **Technologies**: ${randomProject.tech}\n` +
      `🎯 **Key Focus**: ${randomProject.challenge}\n\n` +
      `Would you like to know more about this project, or hear about another one?`;
  }

  // Experience - Deep version
  if (msg.includes("experience") || msg.includes("intern") || msg.includes("career")) {
    conversationState.lastTopic = "experience";
    conversationState.conversationDepth++;
    
    const experiences = [
      "During my Data Analytics internship, I learned how to transform raw data into actionable business insights through interactive dashboards.",
      "My Web Development experience taught me the importance of seamless integration between frontend and backend systems.",
      "Working on Machine Learning projects showed me how predictive models can solve real-world health challenges."
    ];
    
    return `My internship journey has been diverse and enriching:\n\n` +
      `📊 **Data Analytics Intern**: Built interactive HR dashboards with actionable insights\n` +
      `🌐 **Web Development Intern**: Developed dynamic web applications with Python and PHP integration\n` +
      `🤖 **Machine Learning Intern**: Created predictive models for health risk assessment\n\n` +
      `${experiences[conversationState.conversationDepth % experiences.length]}\n\n` +
      `What aspect of my experience interests you most?`;
  }

  // Contact - Deep version
  if (msg.includes("contact") || msg.includes("email") || msg.includes("reach") || msg.includes("hire")) {
    conversationState.lastTopic = "contact";
    
    return `I'd love to connect! 📧\n\n` +
      `Email: Anu's design\n` +
      `Phone: Anu's design\n` +
      `Location: Anu's design\n` +
      `Preferred Topics: Software development collaborations, innovative projects, tech discussions\n` +
      `Response Time: Usually within 24 hours\n\n` +
      `Is there a specific opportunity or topic you'd like to discuss?`;
  }

  // About me
  if (msg.includes("about") && !msg.includes("skill") && !msg.includes("project")) {
    conversationState.lastTopic = "about";
    conversationState.conversationDepth++;
    
    return `I'm Anu's design M, an aspiring Full Stack Developer with expertise in Python, C, C++, and web technologies. \n\n` +
      `My passion lies in building robust and efficient solutions that solve real-world problems. \n\n` +
      `With a strong foundation in both frontend and backend development, along with experience in machine learning and data analytics, I approach problems from multiple perspectives to create comprehensive solutions.`;
  }

  // Follow-up questions based on last topic
  if (msg.includes("why") || msg.includes("how") || msg.includes("tell me more")) {
    if (conversationState.lastTopic === "skills") {
      const deepSkills = [
        "I believe in mastering both frontend and backend technologies to create complete, end-to-end solutions. My diverse skill set allows me to understand the full picture of web application development.",
        "My approach combines analytical thinking from programming languages like Python and C++ with creative problem-solving in web development. Each technology serves a specific purpose in crafting effective solutions.",
        "Learning different technologies has taught me that the best solutions often come from connecting ideas across different domains - from low-level programming to high-level web frameworks."
      ];
      return deepSkills[Math.floor(Math.random() * deepSkills.length)];
    }
    
    if (conversationState.lastTopic === "projects") {
      const projectInsights = [
        "Every project teaches something valuable. The Digital Marketing Agency taught me about seamless system integration. The Heart Attack Prediction system showed me how technology can impact healthcare. The HR Analytics Dashboard reminded me that data should tell compelling stories.",
        "What I love about projects is the journey from idea to implementation. Each project presents unique challenges that help me grow as a developer and problem-solver."
      ];
      return projectInsights[Math.floor(Math.random() * projectInsights.length)];
    }
  }

  // Django specific
  if (msg.includes("django")) {
    return `Django is one of my key backend frameworks! 🐍\n\n` +
      `I've used Django in several projects for:\n` +
      `• Building robust backend systems\n` +
      `• Creating RESTful APIs\n` +
      `• Database management with ORM\n` +
      `• User authentication and security\n\n` +
      `I appreciate Django's "batteries-included" approach that helps in rapid development while maintaining clean, scalable code.`;
  }

  // Python specific
  if (msg.includes("python")) {
    return `Python is my primary programming language! 🐍\n\n` +
      `I use Python for:\n` +
      `• Web development with Django\n` +
      `• Machine Learning and data analysis\n` +
      `• Backend development\n` +
      `• Automation scripts\n\n` +
      `Its versatility and rich ecosystem make it perfect for full-stack development and beyond.`;
  }

  // Personal/philosophical questions
  if (msg.includes("philosophy") || msg.includes("approach") || msg.includes("believe")) {
    conversationState.conversationDepth++;
    return "I believe technology should solve real problems efficiently. My approach combines clean code practices with user-centric design. I'm passionate about building solutions that are not just functional, but also maintainable, scalable, and make a positive impact. What's your perspective on technology's role in problem-solving?";
  }

  if (msg.includes("hobby") || msg.includes("interest") || msg.includes("passion")) {
    return "Beyond coding, I'm passionate about continuous learning and staying updated with the latest tech trends. I enjoy solving complex problems, participating in coding challenges, and contributing to tech communities. These activities keep my skills sharp and my perspective fresh. What are you passionate about?";
  }

  if (msg.includes("future") || msg.includes("goal") || msg.includes("aspiration")) {
    return "I aspire to work on technology that makes a difference—creating scalable web applications, solving complex problems with code, and contributing to projects that have real-world impact. I'm particularly interested in full-stack development roles where I can utilize both my frontend and backend skills. Where do you see technology making the biggest impact in coming years?";
  }

  if (msg.includes("objective") || msg.includes("looking for")) {
    return "I'm seeking a software development role where I can apply my diverse technical knowledge to build robust and efficient solutions. I'm particularly interested in full-stack development positions where I can contribute to both frontend and backend development while continuing to learn and grow professionally.";
  }

  if (msg.includes("thank") || msg.includes("thanks")) {
    return conversationState.userName ? 
      `You're very welcome, ${conversationState.userName}! I've enjoyed our conversation. Is there anything else you'd like to explore about my work or background?` :
      `You're welcome! 😊 I'm here to help you get to know my professional journey better. What else would you like to discuss?`;
  }

  if (msg.includes("bye") || msg.includes("goodbye")) {
    return conversationState.userName ?
      `Goodbye, ${conversationState.userName}! It was great chatting with you. Feel free to return anytime you have more questions. Stay curious! ✨` :
      `Goodbye! Thanks for stopping by. Don't hesitate to return if you have more questions. Have a wonderful day! 🌟`;
  }

  // Default response with context awareness
  const defaultResponses = [
    `That's interesting! Based on our conversation, you might be curious about my ${conversationState.lastTopic || "skills or projects"}. Could you tell me more about what you're looking for?`,
    `I appreciate your message! To make our conversation more meaningful, could you tell me what aspect of my work you're most curious about?`,
    `I'd love to help you with that! Could you elaborate a bit more? Or perhaps you'd like to know about my ${conversationState.lastTopic || "technical background or projects"}?`,
    `Thank you for sharing! To better assist you, are you interested in technical details, project stories, or career insights?`,
    `I'm here to have a genuine conversation about my work and experiences. What specifically would you like to dive deeper into?`
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// ================= SEND MESSAGE =================
function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  // User message
  const userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.textContent = message;
  chatBody.appendChild(userMsg);

  // Clear input
  userInput.value = "";

  // Bot is typing indicator
  const typingIndicator = document.createElement("div");
  typingIndicator.className = "bot-msg typing";
  typingIndicator.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
  chatBody.appendChild(typingIndicator);
  chatBody.scrollTop = chatBody.scrollHeight;

  // Get response
  setTimeout(() => {
    chatBody.removeChild(typingIndicator);
    
    const botMsg = document.createElement("div");
    botMsg.className = "bot-msg";
    
    const response = getDeepResponse(message);
    botMsg.textContent = response;
    
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 800 + Math.random() * 700); // Random delay for natural feel
}

// ================= CONTACT FORM HANDLING =================
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    
    // Simple validation
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }
    
    // Here you would normally send this to a server
    // For now, we'll just show a success message
    alert(`Thank you, ${name}! Your message has been received. I'll get back to you at ${email} soon.`);
    
    // Reset form
    this.reset();
  });
}

// ================= EVENTS =================
sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Focus input when chatbot opens
toggleBtn.addEventListener("click", () => {
  setTimeout(() => userInput.focus(), 100);
});

// ================= INITIAL GREETING =================
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (chatBody.children.length === 0) {
      const welcomeMsg = document.createElement("div");
      welcomeMsg.className = "bot-msg";
      const now = new Date();
      const hour = now.getHours();
      const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
      welcomeMsg.textContent = `${greeting}! I'm Anu's design, an aspiring Full Stack Developer. I'm here to have meaningful conversations about my skills, projects, and experiences. What would you like to explore first?`;
      chatBody.appendChild(welcomeMsg);
    }
  }, 1000);
});

// ================= PAGE LOAD FIX =================
window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});