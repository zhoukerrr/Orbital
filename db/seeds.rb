# Submitted Events
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

#Approved Events
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
    status: "approved",
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
    status: "approved",
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
    status: "approved",
    user_id: 1
  )
end