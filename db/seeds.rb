# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.destroy_all
Artwork.destroy_all

puts '🌙 Seeding users...'

u1 = User.create(username: "SalvDali", password: "password", email: "sdali123@gmail.com", first_name: "Salvador", last_name: "Dali", profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuELHlfVaAUB1aOQk3ZD45xlJlh1CBbA_icQ&usqp=CAU", bio: "I make art from the depths of dreams.")
u2 = User.create(username: "VanGoghMyEggo", password: "password", email: "vvgogh123@gmail.com", first_name: "Vincent", last_name: "Van Gogh", profile_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBDsQ_sgqr7Dd2NL0CGJpIQNgCaOulYKaFfw&usqp=CAU", bio: "Not much to say but a lot to see.")

puts '🌙 Seeding artworks...'

a1 = Artwork.create(user_id: u1.id, title: "The Persistence of Memory", style: "Surrealism", year: 1931, image: "https://www.dalipaintings.com/images/paintings/the-persistence-of-memory.jpg", likes: 0)
a2 = Artwork.create(user_id: u1.id, title: "The Enigma of Desire", style: "Surrealism", year: 1929, image: "https://www.dalipaintings.com/images/paintings/the-enigma-of-my-desire.jpg", likes: 0)
a3 = Artwork.create(user_id: u1.id, title: "The Face of War", style: "Surrealism", year: 1941, image: "https://www.dalipaintings.com/images/paintings/the-face-of-war.jpg", likes: 0)
a4 = Artwork.create(user_id: u1.id, title: "The Anthropomorphic Cabinet", style: "Surrealism", year: 1936, image: "https://www.dalipaintings.com/images/paintings/the-anthropomorphic-cabinet.jpg", likes: 0)
a5 = Artwork.create(user_id: u2.id, title: "The Starry Night", style: "Impressionism", year: 1889, image: "https://images.rawpixel.com/image_1300/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGR2YW5nb2doLXNudmdyb2IuanBn.jpg", likes: 0)
a6 = Artwork.create(user_id: u2.id, title: "Self-Portrait with a Straw Hat", style: "Impressionism", year: 1887, image: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGR2YW5nb2doLWR0MTUwMjUzLmpwZw.jpg", likes: 0)
a7 = Artwork.create(user_id: u2.id, title: "At Eternity’s Gate", style: "Impressionism", year: 1890, image: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGQyNDQtcGRmYW1vdXNwYWludGluZ2V0YzA2ODAxMy1pbWFnZV8zLmpwZw.jpg", likes: 0)
a8 = Artwork.create(user_id: u2.id, title: "Vase with Three Sunflowers", style: "Impressionism", year: 1888, image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3BkMjQ0LXBkZmFtb3VzcGFpbnRpbmcwNjgwMDctMi1pbWFnZV81LmpwZw.jpg" , likes: 0)

puts '🌙 Done seeding!'