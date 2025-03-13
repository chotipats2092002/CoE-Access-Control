import { PureComponent } from 'react'
import ProfileCard from '../components/ProfileCard'

export class About extends PureComponent {
  render() {
    return (
      <>
        <div className="flex flex-grow items-center justify-center p-6">
          <div className='flex flex-col w-full gap-4'>
            <div className='flex flex-row justify-center w-full h-full gap-4'>

              <ProfileCard name={'Thitinan P.'} position={'Front-end'} imageURL={'public/Image/tek.svg'} contacts={{
                facebook: 'https://www.facebook.com/TekNimini?locale=th_TH',
                github: 'http://github.com/thitinan147',
                instagram: 'https://www.instagram.com/tekni____/'
              }} />
              <ProfileCard name={'Isoon S.'} position={'IT Support'} imageURL={'public/Image/ozone.svg'} contacts={{
                facebook: 'https://www.facebook.com/ai.soon.2024',
                github: 'https://github.com/IsoonSer',
                instagram: 'https://www.instagram.com/is_beginner/'
              }} />

              <ProfileCard name={'Chotipat S.'} position={'Back-end'} imageURL={'public/Image/kul.svg'} contacts={{
                facebook: 'https://www.facebook.com/ChotipatSrisawangpanyakul',
                github: 'https://github.com/chotipats2092002',
                instagram: 'https://www.instagram.com/chotyaccforsadnessandfailing/'
              }} />

            </div>

            <div className='flex flex-row justify-center w-full h-full gap-4'>
              <ProfileCard name={'Suphakorn L.'} position={'Back-end'} imageURL={'public/Image/J.svg'} contacts={{
                facebook: 'https://www.facebook.com/suphakorn.lakthong',
                github: 'https://github.com/Suphakorn07',
                instagram: 'https://www.instagram.com/spk.lt/'
              }} />

              <ProfileCard name={'Jetsadakorn P.'} position={'Full-stack'} imageURL={'public/Image/arm.svg'} contacts={{
                facebook: 'https://www.facebook.com/profile.php?id=100006769445652',
                github: 'https://github.com/XsoE',
                instagram: 'https://www.instagram.com/arm_jsdk/'
              }} />
            </div>
          </div>
        </div>
      </>

    )
  }
}

export default About