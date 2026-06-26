interface TeamMember {
  image: string
  name: string
  designation: string
  social: {
    facebook: string
    twitter: string
    instagram: string
  }
}

const teamMembers: TeamMember[] = [
  {
    image: '/img/team-1.jpg',
    name: 'Full Name',
    designation: 'Designation',
    social: {
      facebook: '#',
      twitter: '#',
      instagram: '#'
    }
  },
  {
    image: '/img/team-2.jpg',
    name: 'Full Name',
    designation: 'Designation',
    social: {
      facebook: '#',
      twitter: '#',
      instagram: '#'
    }
  },
  {
    image: '/img/team-3.jpg',
    name: 'Full Name',
    designation: 'Designation',
    social: {
      facebook: '#',
      twitter: '#',
      instagram: '#'
    }
  },
  {
    image: '/img/team-4.jpg',
    name: 'Full Name',
    designation: 'Designation',
    social: {
      facebook: '#',
      twitter: '#',
      instagram: '#'
    }
  },
]

export default function TeamSection() {
  return (
    <div className="py-5">
      <div className="container mx-auto">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
          <h1 className="mb-3 text-3xl font-bold">Property Agents</h1>
          <p className="text-gray-600">
            Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore 
            lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-item rounded overflow-hidden shadow-lg">
              <div className="relative">
                <img 
                  className="w-full h-64 object-cover" 
                  src={member.image} 
                  alt={member.name}
                />
                <div className="absolute left-1/2 -bottom-5 transform -translate-x-1/2 flex space-x-1">
                  <a 
                    href={member.social.facebook} 
                    className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-full mx-1 hover:bg-primary-600 transition-all"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a 
                    href={member.social.twitter} 
                    className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-full mx-1 hover:bg-primary-600 transition-all"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a 
                    href={member.social.instagram} 
                    className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-full mx-1 hover:bg-primary-600 transition-all"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
              <div className="text-center p-4 mt-6">
                <h5 className="font-bold mb-0 text-lg">{member.name}</h5>
                <small className="text-gray-500">{member.designation}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}