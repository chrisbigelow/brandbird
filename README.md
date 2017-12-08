# brandbird
## JS web app that uses Twitter's API and leverages sentiment APIs to get customer satisfaction information about major companies
___

**LIVE LINK:** https://brandbird.herokuapp.com/

## Overview
Brandbird is a single page application that enables the user to view tweet sentiment information for major tech companies.
Upon the selection of a company from the top button fields, Consumer's tweets are is retreived using Twitters "public" API. 
The user can choose to filter by:
* Most popular Tweets
* Most recent Tweets
* Mix - both real-time and popular Tweets

**1000 of these Tweets are retrieved**
These tweets are then sent to sentiment/syntax analyzer APIs and the returned information is displayed to the user in various charts.

## Background

Companies want to know the emotions tied their brand and they need to know this data in real-time so that they can make informed
business decisions. Gathering public tweets regarding a certain company can provide valuable insight into how consumers view their products and/or services
Providing analysis that can can be consumed at a glance will quickly give the user the knowledge they need without having to scroll through
hundreds or thousands of tweets

## Functionality and MVPs
- [ ] Fetch 1000 Tweets from twitter with different search queries and `result_type`
- [ ] Send those tweets to sentiment/syntax analysis API and get a useful response
- [ ] Display these responses in a tone bar graph that shows the predominant tones
- [ ] Show a word cloud with the most predominant words used in tweets [filter profanity]
- [ ] Display some sentences that give the user an overall feeling of how the twitter community is feeling
- [ ] Allow user to enter custom company name if desired


## Mockup

![alt text](https://github.com/chrisbigelow/brandbird/blob/master/mockups/brandbird_mockup.png)

## Architecture and Technologies

* Nodejs housed in Express for back-end server to make API requests
* Vanilla Javascript/HTML/CSS frontend
* Twitter Api client
* **IBM Watson Tone Analyzer API** and **Google Cloud Natural Language API** for tweet sentiment analysis
* **Chart JS** for displaying chart info
* **jQCloud** for word cloud or may hand-roll

## Implementation Timeline

Weekend

- [ ] Tutorials and API research
- [ ] Get Twitter API requests working

Day One

- [ ] Get sentiment API functional
- [ ] Get Web page to fetch/display tweets from server

Day Two

- [ ] Get tweets displaying in box for different companies and different `result_type`
- [ ] add search bar

Day Three

- [ ] Add Tone Chart
- [ ] Add "smart sentences" that give the user insight into consumer emotion

Day Four

- [ ] Polish Styling
- [ ] Add Word Cloud













