import { getAge } from './helpers.js'

export const manifest = {
  questions: [
    {
      header: 'Registration',
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
          sublabel: (
            <>
              To ensure the safety of attendees, this event requires
              vaccinations for all people without medical exemption. We define
              "fully vaccinated" as having had two doses of an MOH-approved vaccine.
              <br />
              <br />
              We will request proof of vaccination on arrival.
            </>
          ),
          type: 'select',
          options: ['Vaccinated', 'Unvaccinated']
        },
        {
          key: `If you're not vaccinated, please explain why:`,
          label: "If you're not vaccinated, please elaborate:",
          type: 'string',
          check: data => data['Vaccinated?'] !== 'Unvaccinated'
        }
      ]
    }
  ]
}

export default manifest

export const requiredList = (() => {
  const list = {}
  for (const section of manifest.questions) {
    section.items
      .filter(item => !item.optional)
      .forEach(item => {
        list[item.key] = item.check
          ? data => {
              console.log(item.key)
              console.log(!item.check(data) || data[item.key])
              console.log(!item.check(data))
              console.log(data[item.key])
              return item.check(data) || data[item.key]
            }
          : data => data[item.key]
      })
  }
  return list
})()
