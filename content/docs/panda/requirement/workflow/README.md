# Requirement Documentation
Our team has examined the requirements that most faculties require to reserve a space. We collected the requirements from real staff and students all over the campus through a number of interviews and document analysis. You can find our analysis as follows.

## Issues of the Current System
In the current workflow, there are many steps to creating a reservation request. This may create a lot of difficulties to space requesters. So, administrators need some helper methods to process all the many requests. For example, writing it down on a big whiteboard; filling it into the Outlook service and many other methods.

## Workflow of the Current System
### STEP 1: ASK AN ADMINISTRATOR ABOUT A SPACE’S AVAILABILITY
A requester needs to ask a relevant administrator about his desired space’s availabil-ity and gives his requirements to the administrator to choose a space that is right for the requester. Administrators will have their own constraints and space selection pro-cedures—they might choose one space over the others.

### STEP 2: FILL-IN A FORM
| Method                 | Description                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| via a proposal         | The proposal includes rea-sons to use the space, equipment requirements and a brief time schedule. |
| via a form             | The form includes struc-tured questions that are required to request a space                       |
| via a proposal & a fee | An outsider is required to make a payment in addi-tion to writing a proposal                       |

### STEP 3: ASK FOR AN APPROVAL FROM AUTHORITIES
The forms will be forwarded to the dean and/or head of academic-support staff (de-pending on each faculty’s reservation guidelines. If the request does not conflict or does not contravene the faculty’s reservation guidelines, it is approved. Then, the approver will be notified by the administrator for the approval.

### STEP 4: CONFIRM AND VERIFY
After the approval, the requester may use the space as requested. All the requested equipment is supplied to the space. However, some of the authorities—maids, securi-ty guards, etc.—are not yet notified about the space usage, so an approved copy of the form is given to them to confirm.

## Rules and Conditions
-	The current reservation process varies by each authority.
-	The current reservation process requires physical signatures from an authority.
-	Each reservation requires various formats of request forms.
## Issues of the Current System
-	Too many steps in order to reserve.
-	Form fragmentation among faculties.
-	Reservation information redundancy may lead to conflicts and overrides.
-	Unnecessarily exporting a schedule consumes too much time.
## Wanted Features
-	A feature that will reduce the workload of administrators on the system.
-	Reserving without physical contact and approval from approvers.
-	Administrators can provision every part of the service easily and can export transaction results.
## Features of the New System
-	Users can quickly search for a space.
-	Users can reserve a space using any internet-connected device.
-	Users can report issues to administrative staff faster.
-	Administrators can manage users and service freely.
-	Administrators can export the new schedule for further usage and logging.
## Data Storage Requirements of the New System
1.	A relational database for keeping service data.
2.	A time series database for logging and further audits.
3.	File systems for other file formats that are not supported by the relational database system.

## Documents Needed in the Old System
| *Type of Document / Role*  | Requester           | Authority       | Approver            |
| :------------------------: | ------------------- | --------------- | ------------------- |
|       **Schedules**        | -                   | A new timetable | New timetable       |
| **Reservation validation** | Reservation form    | -               | Reservation form    |
|    **History logging**     | Reservation history | -               | Reservation history |

As we can see, the current process seems complicated. Moreover, this also varies across faculties. The next section is our summarized analysis of each administrative area.
