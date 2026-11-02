"use strict";

const translations = {
  "nav.home": "Home", "nav.about": "About", "nav.skills": "Skills", "nav.edu": "Education",
  "nav.projects": "Projects", "nav.extras": "Achievements", "nav.contact": "Contact",

  "hero.hello": "Hi, I'm",
  "hero.role": "I'm studying to become a",
  "hero.desc": "Passionate about programming and building technology products from idea to reality, aiming for simplicity, efficiency and a great user experience.",  "hero.btn1": "View projects",
  "hero.btn2": "Contact",
  "hero.cv": "Download CV",

  "about.title": "About me",
  "about.name": "Full name", "about.gender": "Gender", "about.female": "Female",
  "about.dob": "Date of birth", "about.pob": "Place of birth", "about.hcm": "Ho Chi Minh City",
  "about.major": "Major", "about.majorVal": "Information Technology", "about.path": "Career path",
  "stat.projects": "Projects", "stat.gpa": "GPA (out of 4.0)", "stat.langs": "Programming languages", "stat.years": "Years studying IT",
  "about.intro": "I'm Minh Thu, a third-year Information Technology student at the University of Transport Ho Chi Minh City with a solid foundation in programming and website development. I can think logically, research and teach myself new technologies, and I'm responsible, proactive and a good team player. I want to learn, gain experience and develop my professional skills in a business environment.",
  "goal.title": "Career goals",
  "goal.short": "<strong>Short-term:</strong> Seeking an internship opportunity as a Software Developer in 2027 to apply academic knowledge in a practical working environment, while improving programming skills, teamwork abilities, and gaining professional experience.",
  "goal.long": "<strong>Long-term:</strong> Aiming to become a skilled Software Developer with a strong technical foundation, capable of designing and developing software that is reliable, maintainable, user-friendly, and meets real-world needs.",

  "skills.title": "Skills",
  "soft.team": "Teamwork and collaboration", "soft.time": "Time management", "soft.self": "Self-learning, proactively exploring new technologies", "soft.present": "Presenting and communicating ideas",

  "edu.title": "Education & Experience",
  "edu.time1": "2024 – present",
  "edu.school": "University of Transport Ho Chi Minh City",
  "edu.desc1": "Third-year student | Major and specialization: Information Technology | GPA 3.1/4.0",
  "edu.time2": "Present",
  "edu.act": "Activities & achievements",
  "edu.school2": "Giong Ong To High School",
  "edu.desc3": "Graduated high school in 2024",
  "edu.desc2": "None yet. I'm building experience through the projects below.",

  "proj.title": "Projects", "proj.all": "All", "proj.details": "Details",
  "p1.title": "Student Management System",
  "p1.meta": "Team of 5 · Completed",
  "p1.desc": "A system that supports student records, course registration, grade management and timetable lookup.",
  "p2.title": "Personal Portfolio Website",
  "p2.meta": "Individual · Completed",
  "p2.desc": "A personal portfolio website with a responsive layout that works on both computers and mobile devices.",
  "p3.title": "Job Portal Website",
  "p3.meta": "Team of 6 · In progress",
  "p3.desc": "A website connecting job seekers and employers: job search, posting listings, company info and user management.",

  "cert.title": "Certificates", "award.title": "Awards", "hobby.title": "Hobbies", "none": "None yet",
  "hobby.read": "Reading", "hobby.music": "Listening to music", "hobby.photo": "Photography",

  "contact.title": "Contact",
  "contact.intro": "Have an internship opportunity, a small project, or just want to chat about code? Send me a message.",
  "contact.copy": "Copy",
  "contact.loc": "Thu Duc City, Ho Chi Minh City",
  "form.name": "Full name", "form.message": "Message", "form.send": "Send",
  "footer.text": "© 2026 Lâm Trần Minh Thư. IT student."
};

/* Chuỗi dùng trong JavaScript (gõ chữ, modal dự án, thông báo form) */
const dynamicText = {
  vi: {
    roles: ["Software Developer", "Web Developer", "Lập trình viên Python"],
    projects: {
      p1: { title: "Hệ thống quản lý sinh viên", meta: "Python, SQLite · Nhóm 5 thành viên · Đã hoàn thành",
            desc: "Hệ thống hỗ trợ quản lý thông tin sinh viên và hoạt động học tập: hồ sơ sinh viên, đăng ký học phần, quản lý điểm và tra cứu thời khóa biểu.",
            points: ["Phân tích và xác định các yêu cầu chức năng, phi chức năng của hệ thống quản lý sinh viên", "Xây dựng tài liệu phân tích và thiết kế hệ thống, gồm đặc tả yêu cầu, sơ đồ Use Case, DFD và Class Diagram", "Phân tích quy trình hoạt động của các chức năng quản lý sinh viên, đăng ký học phần, quản lý điểm và xem thời khóa biểu", "Tham gia phát triển một số chức năng của hệ thống bằng Python và SQLite"] },
      p2: { title: "Website Portfolio cá nhân", meta: "HTML, CSS, JavaScript · Cá nhân · Đã hoàn thành",
            desc: "Website giới thiệu bản thân, kỹ năng, dự án và thông tin liên hệ, hiển thị tốt trên cả máy tính và thiết bị di động.",
            points: ["Xây dựng website Portfolio cá nhân với giao diện responsive, tương thích trên máy tính và thiết bị di động", "Phát triển các chức năng như menu mobile, lọc dự án, xem chi tiết dự án và chuyển đổi ngôn ngữ Việt/Anh", "Sử dụng JavaScript để xử lý tương tác và kiểm tra dữ liệu trong biểu mẫu liên hệ"] },
      p3: { title: "Website Cổng thông tin việc làm", meta: "HTML, CSS, JavaScript · Nhóm 6 thành viên · Đang phát triển",
            desc: "Website kết nối người tìm việc với nhà tuyển dụng, hỗ trợ tìm kiếm việc làm, đăng tin tuyển dụng, xem thông tin công ty và quản lý người dùng.",
            points: ["Phân tích yêu cầu chức năng và phi chức năng cho website kết nối người tìm việc với nhà tuyển dụng", "Tham gia thiết kế giao diện và bố cục cho các chức năng tìm kiếm việc làm, đăng tin tuyển dụng, xem thông tin công ty và quản lý người dùng", "Phối hợp với các thành viên trong nhóm để xây dựng một số chức năng giao diện bằng HTML, CSS và JavaScript"] }
    },
    roleLabel: "Công việc thực hiện",
    err: {
      nameEmpty: "Vui lòng nhập họ tên.", nameShort: "Họ tên cần ít nhất 2 ký tự.",
      emailEmpty: "Vui lòng nhập email.", emailBad: "Email chưa đúng định dạng, ví dụ: ten@gmail.com.",
      msgEmpty: "Vui lòng nhập lời nhắn.", msgShort: "Lời nhắn cần ít nhất 10 ký tự.",
      fixForm: "Vui lòng kiểm tra lại các ô báo lỗi."
    },
    thanks: name => `Cảm ơn ${name}! Mình đã nhận được lời nhắn và sẽ trả lời sớm.`,
    copied: "Đã sao chép email ✓", copyFail: "Không sao chép được, hãy chép thủ công nhé."
  },
  en: {
    roles: ["Software Developer", "Web Developer", "Python Programmer"],
    projects: {
      p1: { title: "Student Management System", meta: "Python, SQLite · Team of 5 · Completed",
            desc: "A system supporting student information and learning activities: student records, course registration, grade management and timetable lookup.",
            points: ["Analyzed and defined the functional and non-functional requirements of the system", "Built analysis and design documents: requirement specification, Use Case diagram, DFD and Class Diagram", "Analyzed the workflows of student management, course registration, grade management and timetable viewing", "Contributed to developing some features in Python and SQLite"] },
      p2: { title: "Personal Portfolio Website", meta: "HTML, CSS, JavaScript · Individual · Completed",
            desc: "A website presenting myself, my skills, projects and contact info, displaying well on both computers and mobile devices.",
            points: ["Built a personal portfolio website with a responsive layout for computers and mobile devices", "Developed features such as a mobile menu, project filtering, project detail view and Vietnamese/English switching", "Used JavaScript to handle interactions and validate the contact form"] },
      p3: { title: "Job Portal Website", meta: "HTML, CSS, JavaScript · Team of 6 · In progress",
            desc: "A website connecting job seekers and employers, supporting job search, posting listings, company info and user management.",
            points: ["Analyzed functional and non-functional requirements for a website connecting job seekers and employers", "Helped design the UI and layout for job search, posting listings, company info and user management", "Worked with team members to build some UI features in HTML, CSS and JavaScript"] }
    },
    roleLabel: "My work",
    err: {
      nameEmpty: "Please enter your name.", nameShort: "Your name needs at least 2 characters.",
      emailEmpty: "Please enter your email.", emailBad: "Invalid email format, e.g. name@gmail.com.",
      msgEmpty: "Please enter a message.", msgShort: "Your message needs at least 10 characters.",
      fixForm: "Please check the fields marked with errors."
    },
    thanks: name => `Thank you, ${name}! I've received your message and will reply soon.`,
    copied: "Email copied ✓", copyFail: "Couldn't copy, please copy it manually."
  }
};

let currentLang = localStorage.getItem("lang") || "vi";
const dyn = () => dynamicText[currentLang];

/* Chuyển ngôn ngữ cho toàn bộ phần tử có data-i18n / data-i18n-html */
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n], [data-i18n-html]").forEach(el => {
    const isHtml = el.hasAttribute("data-i18n-html");
    const key = el.dataset.i18n || el.dataset.i18nHtml;
    if (el.dataset.vi === undefined) el.dataset.vi = isHtml ? el.innerHTML : el.textContent; // lưu bản tiếng Việt gốc
    const text = lang === "vi" ? el.dataset.vi : translations[key];
    if (text === undefined) return;
    if (isHtml) el.innerHTML = text; else el.textContent = text;
  });

  const btn = document.getElementById("langBtn");
  if (btn) {
    btn.textContent = lang === "vi" ? "EN" : "VI";
    btn.setAttribute("aria-label", lang === "vi" ? "Switch to English" : "Chuyển sang tiếng Việt");
  }
}
