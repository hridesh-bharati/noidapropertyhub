interface Testimonial {
  image: string
  name: string
  profession: string
  text: string
}

const testimonials: Testimonial[] = [
  {
    image: '/img/testimonial-1.jpg',
    name: 'Client Name',
    profession: 'Profession',
    text: 'Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd erat eos'
  },
  {
    image: '/img/testimonial-2.jpg',
    name: 'Client Name',
    profession: 'Profession',
    text: 'Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd erat eos'
  },
  {
    image: '/img/testimonial-3.jpg',
    name: 'Client Name',
    profession: 'Profession',
    text: 'Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd erat eos'
  },
]

export default function Testimonials() {
  return (
    <div className="py-5">
      <div className="container mx-auto">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
          <h1 className="mb-3 text-3xl font-bold">Our Clients Say!</h1>
          <p className="text-gray-600">
            Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore 
            lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-100 rounded p-3">
              <div className="bg-white border rounded p-4">
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <div className="flex items-center">
                  <img 
                    className="flex-shrink-0 rounded" 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    style={{ width: '45px', height: '45px' }}
                  />
                  <div className="ps-3">
                    <h6 className="font-bold mb-1">{testimonial.name}</h6>
                    <small className="text-gray-500">{testimonial.profession}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}