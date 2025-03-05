import { PureComponent } from 'react'
import ProfileCard from '../components/ProfileCard'

export class About extends PureComponent {
  render() {
    return (
      <>
        <div className="flex flex-grow items-center justify-center p-6">
          <div className='flex flex-col w-full gap-4'>
            <div className='flex flex-row justify-center w-full h-full gap-4'>

              <ProfileCard name={'Thitinan P.'} position={'Front-end'} imageURL={'https://avatars.githubusercontent.com/u/96052042?v=4'} contacts={{
                facebook: 'https://www.facebook.com/TekNimini?locale=th_TH',
                github: 'http://github.com/thitinan147',
                instagram: 'https://www.instagram.com/tekni____/'
              }} />
              <ProfileCard name={'Isoon S.'} position={'IT Support'} imageURL={'https://scontent-bkk1-1.xx.fbcdn.net/v/t39.30808-6/269909123_116814917513687_5833524419124727806_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=KZgnppujjGoQ7kNvgEmpLWm&_nc_oc=AdiRNZPzLSlsnUlBYUhN7N7xR37p9eoWmCp5aIXweX1StcjZk7j0svHKMuOplf2DclA&_nc_zt=23&_nc_ht=scontent-bkk1-1.xx&_nc_gid=A-NuWILmMlnVcwSXNdmKXkr&oh=00_AYDp0MYkkDATZ93ZA383jbbUZzyLssxqwoARf5Y9OOeKvQ&oe=67CDEBC5'} contacts={{
                facebook: 'https://www.facebook.com/ai.soon.2024',
                github: 'https://github.com/IsoonSer',
                instagram: 'https://www.instagram.com/is_beginner/'
              }} />

              <ProfileCard name={'Chotipat S.'} position={'Back-end'} imageURL={'https://scontent-bkk1-1.xx.fbcdn.net/v/t39.30808-6/462499012_3548183178805571_8361577468048538342_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=za_iaZvlOkQQ7kNvgFkTg_j&_nc_oc=AdhSjUH_y8YewXIXlLPsoLxbJnN1Ivn1VY8Osb_Gj6MOzJEf6rVeNlDKJItxektHaQc&_nc_zt=23&_nc_ht=scontent-bkk1-1.xx&_nc_gid=AaR8P3kbTCqHQMlAkr0vq6A&oh=00_AYAfXdvSAC54Kw8G81FKrZTVv9olTpIEmv7nlHB6Gp8NHw&oe=67CE139F'} contacts={{
                facebook: 'https://www.facebook.com/ChotipatSrisawangpanyakul',
                github: 'https://github.com/chotipats2092002',
                instagram: 'https://www.instagram.com/chotyaccforsadnessandfailing/'
              }} />

            </div>

            <div className='flex flex-row justify-center w-full h-full gap-4'>
              <ProfileCard name={'Suphakorn L.'} position={'Back-end'} imageURL={'https://avatars.githubusercontent.com/u/91935528?v=4'} contacts={{
                facebook: 'https://www.facebook.com/suphakorn.lakthong',
                github: 'https://github.com/Suphakorn07',
                instagram: 'https://www.instagram.com/spk.lt/'
              }} />

              <ProfileCard name={'Jetsadakorn P.'} position={'Full-stack'} imageURL={'https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/461685776_3905800762988867_5395430066710436585_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=CA8t2l3TQboQ7kNvgE6J-TU&_nc_oc=AdhIkLovUIg7YsejhVu2m2c4tTqbpCfnSHyezPcoJB_im1b25DPpHudQVcyOg9qv1PA&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=AR4AyinovSMIMN-QflT3uKk&oh=00_AYB7QofIotoAouMizFfr2w_MttGJvyJSl9Rexo0PXou0jA&oe=67CE192F'} contacts={{
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