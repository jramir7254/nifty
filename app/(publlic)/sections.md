# Read me

About This Tool
This tool leverages the OpenAI Model API to generate Nifty Assignments based on user-provided prompts. The model operates on a token-based pricing system. For more information, please visit: https://platform.openai.com/docs/pricing.
To access the application, you will need an OpenAI username and password.
For demonstration purposes, we have included the following links, as well as a list of sample activities available in the upper-right section of this site for your review.

Summary: What is the tool about?

The tool is a software application designed to generate nifty assignments for computer science courses to help educators create engaging and pedagogically aligned learning assignments by integrating Bloom’s for Computing into the assignment generation process. By selecting a Bloom’s level, ranging from lower order thinking skills such as remembering and understanding to higher order skills like analyzing, evaluating, and creating, educators can certify that each assignment aligns with their intended learning outcomes and assessment verbs. The tool also offers a feature that allows educators to incorporate local city infrastructures, such as schools or transportation systems, into the assignment context to foster a sense of belonging and relevance that encourages students to connect computing concepts with real world applications in their own communities, resulting with an assignment that enhances learning outcomes and boosts student engagement.

# Topics

The Nifty Assignment Generator was initially created for the Computer Science 3 course, aligning with the ACM CCECC Computer Science Curricular Guidance for Associate-Degree Transfer Programs infused with Cybersecurity learning outcomes. These outcomes are as follows:
AL-13. Compare various data structures for a given problem, such as array, list, set, map, stack, queue, hash table, tree, and graph.
DS-22. Illustrate the basic terminology of graph theory including properties and special cases for each type of graph/tree.
DS-22. Describe the basic terminology of graph theory.

The developers of this tool recognize the evolving landscape of computer science education, where the fundamentals of computer science often serve as a gateway to diverse fields like data science, cybersecurity, and computational biology, collectively referred to as "CS + X." Therefore, software updates were meticulously designed, keeping in mind the following Student Learning Outcomes (SLO) from the ACM curriculum guidelines for 2023:

ACM/IEEE-CS/AAAI Computer Science Curricula (CS2023)
SEP-Context: Social Context. Often referred to as the digital divide, differences in access to digital technology resources and its resulting ramifications for gender, class, ethnicity, geography, and/or underdeveloped countries.
AL-Foundational: Foundational Data Structures and Algorithms. Using a real-world example, explain step-by-step how the ADT operations associated with the data structure transform it.

ACM Cybersecurity Curricular Guidance for Associate-Degree Programs (Cyber2y2020)
Data Forensics: [DAT-LO-E09] Perform fundamental incident response functions including detecting, responding, and recovering from security incidents
Human Security: [HUM-LO-E01] Compare various methods of identity management, identification, authentication, and access authorization, such as roles, biometrics, and multifactor systems.
Data Integrity and Authentication: [DAT-LO-E11] Summarize the benefits and challenges of multifactor authentication.
System Access and Control: [SYS-LO-E07] Contrast various system-related methods for authentication, authorization, and access control.
Fundamental Principles: [SOF-LO-E05] Modify the levels of abstraction in a given piece of software to provide single layer abstraction whenever possible.
Design: [SOF-LO-E08] Explain security requirements in software design for a given scenario.
Implementation: [SOF-LO-E12] Write secure code which implements input validation and prevents buffer overflow, integer range violations, and input type violations

The ACM Computing Competencies for Undergraduate Data Science Curricula ACM Data Science Task Force
Programming, Data Structures, and Algorithms (PDA: Concentrates on the skills and knowledge required to implement and understand algorithms used for data collection and analysis.

# Audience

Community Colleges are two-year programs in the United States (e.g., see Servin et. al), which classes are composed of heterogeneous audiences (student populations) such as Early College High Schools (ECHS), pathways of technology (P-TECH), industry upscaling programs, four-year transferable degrees, military training, including non-cs graduated students who pursue a masters in software engineering or other computing classes. Therefore, the tool was designed to address as many communities as possible.

# Difficulty

CS 2 Perspective:
In the view of CS 3 students, the generated assignments presented a moderate level of difficulty. Defining data structures was found to be relatively straightforward. However, when it came to the actual implementation of such data structure, students encountered challenges that necessitated supplementary information. To address this deficiency, an Open Educational Resource (OER) was created.

CS 3 Perspective:
The generated assignments in CS 3 took two distinct forms:
Remedial Activity: The majority of students perceived this as "difficult". Some students expressed that they had not previously covered the topics required for this assignment. This reaction is deemed normal, particularly given that the project was assigned in the first week of classes, right after summer or winter break, in a standard 16-week semester. Additionally, students recognized the need to focus on specific areas, such as data structures.

Activity for Graphs: Students generally found declaring and populating a graph to be relatively straightforward. However, they encountered challenges when tasked with creating methods that interacted with multiple data structures, considering this aspect to be difficult.

CS 2 Honors Project:
For those CS 2 students aspiring to pursue an honors or enhanced honors project, the bloom;s for computing feature was developed. These students were required to conduct in-depth research on specific topics, some of which were covered in the provided OER. In other instances, particularly in the realm of cybersecurity and data analysis, students needed to conduct research in areas that align with the requirements of an honors project.Computer Science CS 1 and CS 2
The primary objective of computer science education is to teach data structures and algorithms. How to define, and implement a graph. Additionally, the assignment covers topics such as advanced data structures, and how to define a collection. As mentioned in Section 1, the first implementation of the tool is designed for a traditional CS 3 course. Additional features are intended to be offered in a traditional CS 2 and CS 3.

Remedial Activity for CS 3
The course "Fundamentals of Computer Programming III," often referred to as CS 3, serves as the natural progression from "Fundamentals of Computer Programming II." Many educational institutions offer these courses as part of a sequence. In CS 2 is often employed as a refresher or warm-up to reinforce key concepts before delving into more advanced material. This preparatory exercise not only helps students gauge their current proficiency in the subject but also fosters awareness of the specific areas that may need revisiting from their CS 2 experience. Furthermore, educators can utilize the results of this preparatory phase to identify and address potential shortcomings within the classroom, offering an opportunity for targeted interventions, particularly in smaller educational settings like community colleges.

Honors Project An honor project is an in-depth research or academic project that is undertaken by a student in an honors or track of their program. The tool has also served as an honor’s project generator for non-cs majors or for students who pursue a CS + X degree and are taking CS 3.

Competency-Based Education
This assignment serves as well as a competency for CS 3. Competency-Based education is recognized when a student's advancement is determined by their demonstrated mastery of content rather than the amount of time spent in a seat. Students engage in active learning through diverse pathways and at their own individualized pace. Many institutions have been adopting the CBE modality nowadays, in particular in community colleges, since this modality evaluates summative assessment that covers topics from traditional CS 3 courses.

# Length

The tool was structured with three assignment components as follows:
Bloom's for computing: Educators select the level for order thinking skills
Sense of Belonging: Educators select local regional city infrastructures that students are familiar with
Topic: Educators select the learning outcomes

In theory, the entire generated assignments could be finished in a range of 1 to 2 hours, depending on the instructional approach chosen by the educator.

In practice, the community college proctored this activities and observed a variety of completion times among our students.
Some students, particularly those with prior programming experience or exposure to similar assignments, managed to complete the entire assignment in just one hour.
While the assignments may not have been flawless, it was considered "satisfactory," indicating that the student demonstrated competence in the CS 2 course, where students completed the entire assignments in two hours.
Generally, students in CS 3 tended to require approximately one hour to complete the assignments.

# Strengths

Curriculum Alignment: This tool has been carefully designed to conform to well-established curricular standards by encompassing learning outcomes, subject matter, and competencies. It adheres to the ACM's mission, striving to establish best practices that resonate with these educational frameworks.
Content Integration: This tool serves as a comprehensive consolidation of topics covered in CS 2, aiming to synthesize these concepts into a singular activity.
Impact on Workforce and Competency-Based Education (CBE): Community colleges excel in offering a direct pathway to the workforce, with a curriculum deeply influenced by regional employment trends. In today's landscape, cybersecurity and data analytics play a pivotal role. While this tool introduces foundational concepts in these areas, it primarily serves as a catalyst, making students aware of the career opportunities available locally and inspiring them to pursue degrees that align with their career aspirations. Although it does not delve into these subjects in great depth, it provides sufficient insight for students to grasp the potential impact of computer science courses on their future careers.
Interdisciplinary Synergy: This tool encompasses elements of computer science, programming, cybersecurity, and data analytics, allowing students to fuse these disciplines for real-world applications.
Flexibility in Delivery: The tool's modular structure provides educators with the flexibility to adapt its complexity and scope based on the specific requirements and nature of their courses. This adaptability allows educators to tailor the assignments's components to suit the unique characteristics of their classes.

# Weaknesses

Time constraints: A drawback relates to the time required. We recognize that the assignments demand a substantial amount of time to complete. Some of these topics may not be covered in the course notes or the textbook. The assignments were intentionally designed this way to enhance computational thinking and problem-solving skills. Nevertheless, we acknowledge that the time commitment can be extensive, especially for students without a strong background in these areas. To mitigate this issue, the feature of selecting an assignment or a laboratory to be generated was added, allowing educators the flexibility to pace it according to their students' needs.
