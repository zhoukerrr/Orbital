# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
20.times do |i|
  Event.create(
    name: "Seed Event #{i + 1}",
    tag: "Environment",
    summary: "seed generated summary",
    venue: "seed generated venue",
    start_date: "2021-06-25T16:00:00.000Z",
    end_date: "2021-06-26T15:59:59.000Z",
    details: "seed generated details",
    skills: "seed generated skills",
    link: "seed.generated.link",
    contact: "seed generated contact",
    user_id: 1
  )
end

20.times do |i|
  Event.create(
    name: "Seed Event #{i + 21}",
    tag: "Fund-Raising",
    summary: "seed generated summary",
    venue: "seed generated venue",
    start_date: "2021-06-25T16:00:00.000Z",
    end_date: "2021-06-26T15:59:59.000Z",
    details: "seed generated details",
    skills: "seed generated skills",
    link: "seed.generated.link",
    contact: "seed generated contact",
    user_id: 1
  )
end

20.times do |i|
  Event.create(
    name: "Seed Event #{i + 41}",
    tag: "Senior",
    summary: "seed generated summary",
    venue: "seed generated venue",
    start_date: "2021-06-25T16:00:00.000Z",
    end_date: "2021-06-26T15:59:59.000Z",
    details: "seed generated details",
    skills: "seed generated skills",
    link: "seed.generated.link",
    contact: "seed generated contact",
    user_id: 1
  )
end