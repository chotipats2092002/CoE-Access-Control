import { PureComponent } from 'react'
import ProfileCard from '../components/ProfileCard'

const profiles = [
  {
    name: 'Assoc. Prof Chatchai',
    position: 'Advisor',
    imageURL: 'public/ck.png',
    contacts: {
      facebook: 'https://www.facebook.com/ck.boa.39',
      github: 'https://github.com/ckboa',
      instagram: 'none'
    },
    style: 'bg-radial-[at_25%_25%] from-white to-[#fcdb4d] to-75%',
  },

  {
    name: 'Suphakorn L.',
    position: 'Back-end',
    imageURL: 'public/Image/J.svg',
    contacts: {
      facebook: 'https://www.facebook.com/suphakorn.lakthong',
      github: 'https://github.com/Suphakorn07',
      instagram: 'https://www.instagram.com/spk.lt/'
    }
  },

  {
    name: 'Isoon S.',
    position: 'IT Support',
    imageURL: 'public/Image/ozone.svg',
    contacts: {
      facebook: 'https://www.facebook.com/ai.soon.2024',
      github: 'https://github.com/IsoonSer',
      instagram: 'https://www.instagram.com/iamisoon/'
    }
  },
  {
    name: 'Chotipat S.',
    position: 'Back-end',
    imageURL: 'public/Image/kul.svg',
    contacts: {
      facebook: 'https://www.facebook.com/ChotipatSrisawangpanyakul',
      github: 'https://github.com/chotipats2092002',
      instagram: 'https://www.instagram.com/chotyaccforsadnessandfailing/'
    }
  },
  {
    name: 'Thitinan P.',
    position: 'UX/UI, Front-end',
    imageURL: 'public/Image/tek.svg',
    contacts: {
      facebook: 'https://www.facebook.com/TekNimini?locale=th_TH',
      github: 'http://github.com/thitinan147',
      instagram: 'https://www.instagram.com/tekni____/'
    }
  },

  {
    name: 'Jetsadakorn P.',
    position: 'Full-stack',
    imageURL: 'public/Image/arm.svg',
    contacts: {
      facebook: 'https://www.facebook.com/profile.php?id=100006769445652',
      github: 'https://github.com/XsoE',
      instagram: 'https://www.instagram.com/arm_jsdk/'
    }
  }
]

export class About extends PureComponent {
  render() {
    return (
      <div className="flex flex-col items-center justify-center h-full xl:h-screen pt-20">
        <div className="flex flex-col flex-grow items-center justify-start p-6 w-full xl:w-[1040px] mx-auto space-y-8 ">

          {/* Team Profiles Section */}
          <h2 className="text-2xl font-bold text-gray-800 ">Our Team</h2>
          <ul className="flex flex-wrap gap-4 justify-center">
            {profiles.map((profile, index) => (
              <li key={index}>
                <ProfileCard {...profile} alwaysColoredIcons={index === 0} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default About