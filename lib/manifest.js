import { getAge } from './helpers.js'

export const manifest = {
  questions: [
    {
      header: 'Basic Details',
      items: [
        {
          key: 'Full Name',
          label: 'Full Name',
          type: 'string',
          optional: false
        },
        {
          key: 'Email',
          label: 'Contact Email',
          type: 'string',
          inputType: 'email',
          sublabel: `We'll be in touch using this email, so make sure you check it regularly.`,
          optional: false
        },
        {
          key: 'Birthday',
          label: 'Birthday',
          type: 'string',
          inputType: 'date',
          sublabel: `All high-school & upper-middle-school aged students are welcome to come!`,
          optional: false
        },
        {
          key: 'Shirt',
          label: 'T-Shirt Size',
          type: 'select',
          sublabel: `We'll be having awesome swag, so you won't want to miss out.`,
          options: ['Extra Small', 'Small', 'Medium', 'Large', 'Extra Large'],
          optional: false
        },
        {
          key: 'Skill Level',
          label: 'How would you describe your technical skills?',
          sublabel: `Everyone's welcome! This question is just to help us gauge what resources we need to support attendees.`,
          type: 'select',
          options: [
            'Beginner: have never coded before or just started learning',
            'Intermediate: I have taken CS classes OR worked on small individual projects',
            'Advanced: I’m comfortable with my skill set and can work on a project without much guidance'
          ],
          optional: false
        },
        {
          key: 'Dietary Restrictions',
          label: 'Do you have any dietary restrictions? Please list them here.',
          type: 'paragraph',
          optional: true
        },
        {
          key: 'Vaccinated?',
          label: 'Vaccine Status',
          sublabel: <>To ensure the safety of attendees, this event requires vaccinations for all people without medical exemption. We define "fully vaccinated" as in accordance with the CDC: <a target="_blank" href="https://www.cdc.gov/coronavirus/2019-ncov/vaccines/stay-up-to-date.html">cdc.gov/coronavirus/2019-ncov/vaccines/stay-up-to-date</a>. 
<br/><br/>
          We will request proof of vaccination on arrival.</>,
          type: 'select',
          options: ['Yes', 'No']
        },
        {
          key: `If you're not vaccinated, please explain why:`,
          label: "If you're not vaccinated, please elaborate:",
          type: 'string',
          check: data => data['Vaccinated?'] !== 'No'
        }
      ]
    },
    {
      header: 'Guardian Details',
      label: `Please provide us with the details of a parent/guardian. We'll contact them with a consent form and a participant waiver. This will be sent out two weeks before the event.`,
      check: data => data['Birthday'] === undefined || getAge(data['Birthday']) > 17,
      items: [
        {
          key: 'Parent Name',
          label: "What's your guardian's name?",
          type: 'string',
          optional: false,
          check: data => data['Birthday'] === undefined || getAge(data['Birthday']) > 17,

        },
        {
          key: 'Parent Email',
          label: "What's your guardian's email?",
          type: 'string',
          optional: false,
                check: data => data['Birthday'] === undefined || getAge(data['Birthday']) > 17,

        }
      ]
    },
    {
      header: 'Workshops',
      label: `At Lion City Hacks, attendees will have an opportunity to host their own informal workshops! You bring a passion and we'll provide a room with participants. These questions are not a commitment! You can choose to change your topic or not present at any time.`,
      items: [
        {
          key: 'Would you be interested in hosting a workshop session?',
          label: 'Would you be interested in hosting a session?',
          type: 'select',
          options: ['Yes, for sure!', `No, it's alright.`],
          optional: false
        },
        {
          key: 'Workshop Topic',
          label: 'Awesome! What do you think you would like to talk about?',
          type: 'paragraph',
          optional: false,
          check: data =>
            data[
              'Would you be interested in hosting a workshop session?'
            ] == `No, it's alright.` ||
            data[
              'Would you be interested in hosting a workshop session?'
            ] === undefined
        }
      ]
    },
    {
      header: 'Now for a bit of fun!',
      items: [
        {
          key: 'Tabs or Spaces',
          label: 'Tabs vs. Spaces?',
          type: 'select',
          options: ['Tabs', 'Spaces', 'No Indent 😎'],
          optional: false
        },
        {
          key: 'Pineapple on Pizza',
          label: 'Pineapple on pizza, yes or no?',
          type: 'select',
          options: ['Yes!', 'No...why?'],
          optional: false
        }
      ]
    }
  ]
}

export default manifest;

export const requiredList = (() => {
  const list = {};
  for (const section of manifest.questions) {
    section.items.filter(item => !item.optional).forEach(item => {
      list[item.key] = item.check ? (data => {
        console.log(item.key);
        console.log(!item.check(data) || data[item.key]);
        console.log(!item.check(data));
        console.log(data[item.key]);
        return item.check(data) || data[item.key];
      }) : (data => data[item.key]);
    });
  }
  return list;
})();
