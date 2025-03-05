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
          </div>
        </div>
      </>

    )
  }
}

export default About