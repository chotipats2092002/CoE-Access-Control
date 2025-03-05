import { PureComponent } from 'react'
import ProfileCard from '../components/ProfileCard'

export class About extends PureComponent {
  render() {
    return (
      <>
        <div className="flex flex-grow items-center justify-center p-6">
          <div className='flex flex-col w-full gap-4'>
            <div className='flex flex-row justify-center w-full h-full gap-4'>

              <ProfileCard name={'Tekni'} position={'Front-end'} imageURL={'https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg'} contacts={{
                facebook: 'https://www.facebook.com/TekNimini?locale=th_TH',
                github: 'http://github.com/thitinan147',
                instagram: 'https://www.instagram.com/tekni____/'
              }} />
              <ProfileCard name={'Tekni'} position={'Front-end'} imageURL={'https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg'} contacts={{
                facebook: 'https://www.facebook.com/TekNimini?locale=th_TH',
                github: 'http://github.com/thitinan147',
                instagram: 'https://www.instagram.com/tekni____/'
              }} />

              <ProfileCard name={'Tekni'} position={'Front-end'} imageURL={'https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg'} contacts={{
                facebook: 'https://www.facebook.com/TekNimini?locale=th_TH',
                github: 'http://github.com/thitinan147',
                instagram: 'https://www.instagram.com/tekni____/'
              }} />

            </div>

            <div className='flex flex-row justify-center w-full h-full gap-4'>
              <ProfileCard name={'jele'} position={'Front-end'} imageURL={'https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/476438208_3490290394597970_7989745236636103460_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=4XwT3JNvqsMQ7kNvgGLBA2P&_nc_oc=AdgqI2gBjWV1N9S4W2csdwfEvdOsXjLKlFSL8_dDeA1GA6FU4yoenOw2YSR0TEQRV7U&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=ANp5hKofd6B_fKQYuDxmxY5&oh=00_AYAA5ERaCr5gl0xEB9cYt40b_VJSmooIwvJePt5eSixHmQ&oe=67CDE92D'} contacts={{
                facebook: 'https://www.facebook.com/TekNimini?locale=th_TH',
                github: 'http://github.com/thitinan147',
                instagram: 'https://www.instagram.com/tekni____/'
              }} />

              <ProfileCard name={'Tekni'} position={'Front-end'} imageURL={'https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg'} contacts={{
                facebook: 'https://www.facebook.com/TekNimini?locale=th_TH',
                github: 'http://github.com/thitinan147',
                instagram: 'https://www.instagram.com/tekni____/'
              }} />
            </div>
          </div>
        </div>
      </>

    )
  }
}

export default About