<script lang="ts">
  import ModeSwitcher from "./ModeSwitcher.svelte";
  import Tailwindcss from "./Tailwindcss.svelte";
  import Landing from "./Landing.svelte";
  import SearchList from "./SearchList.svelte";

  let isSearching = false;
  let isLoading = false;
  let error = false;
  let recommendations = [];

  const handleSearch = async ({ detail: query }) => {
    isSearching = true;
    isLoading = true;
    console.log(query);
    const [err, res] = await to(fetch("https://recommeddit.nrp-nautilus.io/search?"
      + new URLSearchParams({ query })));
    if (err || !res.ok) {
      error = true;
      return;
    }
    let parsedRes = res.json
    // const parsedRes = {
    //   "success": true, "recommendations": [{
    //     "recommendation": "Emma Stone",
    //     "images": ["https://m.media-amazon.com/images/I/81jA+wxj55L._AC_SL1500_.jpg", "https://nationaltoday.com/wp-content/uploads/2020/04/unicorn-1-1.jpg", "https://cdn.shopify.com/s/files/1/1365/2497/products/Rainbow-unicorn-mask_1024x.png?v=1553633323", "https://images-na.ssl-images-amazon.com/images/I/513KLIb5CwL.jpg", "https://www.daysoftheyear.com/cdn-cgi/image/dpr=1%2Cf=auto%2Cfit=cover%2Cheight=675%2Cmetadata=none%2Conerror=redirect%2Cq=85%2Cwidth=1200/wp-content/uploads/unicorn-day-e1523293823642.jpg"],
    //     "score": 1125.0,
    //     "link": "https://www.sitepoint.com/url-parameters-jquery/",
    //     "description": {
    //       "url": "https://en.wikipedia.org/wiki/Emma_Stone",
    //       "license": "https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License",
    //       "articleBody": "Emily Jean \"Emma\" Stone is an American actress. She is the recipient of various accolades, including an Academy Award, a British Academy Film Award, and a Golden Globe Award. "
    //     },
    //     "comments": [{
    //       "title": "Reddit - What is your favourite animal?",
    //       "score": -1,
    //       "ups": -1,
    //       "downs": 0,
    //       "body text": "Emma Stone ",
    //       "permalink": "www.reddit.com/r/AskReddit/comments/2df5q1/reddit_what_is_your_favourite_animal/cjox3kj/",
    //       "author name": "AllrightsunnyD"
    //     }]
    //   }, {
    //     "recommendation": "Simba",
    //     "images": ["https://akcdn.detik.net.id/visual/2018/11/23/219135ca-542e-427c-aecf-ee9bdf58b12e_169.jpeg?w=650", "https://static.wikia.nocookie.net/disney/images/3/37/Profile_-_Simba.jpeg/revision/latest?cb=20190312043852", "https://upload.wikimedia.org/wikipedia/en/thumb/9/94/Simba_%28_Disney_character_-_adult%29.png/220px-Simba_%28_Disney_character_-_adult%29.png", "https://cdns.klimg.com/kapanlagi.com/p/lionkingsimba.jpg", "https://cdn0-production-images-kly.akamaized.net/mvTR6RTVNzZ0WDYuTDedGB2vKd0=/335x0:1300x965/1200x900/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2432321/original/040684600_1542947121-simba_3.jpg"],
    //     "score": 1125.0,
    //     "link": "https://www.sitepoint.com/url-parameters-jquery/",
    //     "description": {
    //       "license": "https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License",
    //       "articleBody": "Simba Sports Cluub is a football club based in Kariakoo, Dar es Salaam Tanzania,\nFounded in 1936, the club was named Eagles, then to Sunderland. In 1971 they were renamed Simba.\nSimba SC is one of the two biggest clubs in Tanzania, alongside cross-city rivals Young Africans. ",
    //       "url": "https://en.wikipedia.org/wiki/Simba_S.C."
    //     },
    //     "comments": [{
    //       "title": "Reddit - What is your favourite animal?",
    //       "score": -2,
    //       "ups": -2,
    //       "downs": 0,
    //       "body text": "Simba",
    //       "permalink": "www.reddit.com/r/AskReddit/comments/2df5q1/reddit_what_is_your_favourite_animal/cjowpu8/",
    //       "author name": "Boiled_Potatoe"
    //     }]
    //   }, {
    //     "recommendation": "Unicorn",
    //     "images": ["https://m.media-amazon.com/images/I/81jA+wxj55L._AC_SL1500_.jpg", "https://nationaltoday.com/wp-content/uploads/2020/04/unicorn-1-1.jpg", "https://cdn.shopify.com/s/files/1/1365/2497/products/Rainbow-unicorn-mask_1024x.png?v=1553633323", "https://images-na.ssl-images-amazon.com/images/I/513KLIb5CwL.jpg", "https://www.daysoftheyear.com/cdn-cgi/image/dpr=1%2Cf=auto%2Cfit=cover%2Cheight=675%2Cmetadata=none%2Conerror=redirect%2Cq=85%2Cwidth=1200/wp-content/uploads/unicorn-day-e1523293823642.jpg"],
    //     "score": 133.6,
    //     "link": "https://www.sitepoint.com/url-parameters-jquery/",
    //     "description": {
    //       "license": "https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License",
    //       "url": "https://en.wikipedia.org/wiki/Unicorn",
    //       "articleBody": "The unicorn is a legendary creature that has been described since antiquity as a beast with a single large, pointed, spiraling horn projecting from its forehead.\n"
    //     },
    //     "comments": [{
    //       "title": "People of reddit, what is your favorite animal and why?",
    //       "score": 0,
    //       "ups": 0,
    //       "downs": 0,
    //       "body text": "Unicorn, because shrooms and shit.\n\nPlus, unicorn hates Voldemort and I hate him too. And when you hate the same thing with someone you create a powerful bond. :P",
    //       "permalink": "www.reddit.com/r/AskReddit/comments/2gwjfb/people_of_reddit_what_is_your_favorite_animal_and/ckn67jt/",
    //       "author name": "kokolo123"
    //     }]
    //   }, {
    //     "recommendation": "Skunk",
    //     "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Skunk_about_to_spray.jpg/220px-Skunk_about_to_spray.jpg", "https://www.mymove.com/wp-content/uploads/2020/08/GettyImages-980510606-1-scaled.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Striped_Skunk.jpg/1200px-Striped_Skunk.jpg", "https://i.natgeofe.com/n/07a3e703-3767-4c43-8df6-a1a8753168d0/striped-skunk_thumb_3x2.JPG", "https://weilerwoodsforwildlife.com/wp-content/uploads/2020/06/skunk-unsplash-bryan-padron-jG8eaA5Iq3A-unsplash-768x1024.jpeg"],
    //     "score": 120.0,
    //     "link": "https://www.sitepoint.com/url-parameters-jquery/",
    //     "description": {
    //       "url": "https://en.wikipedia.org/wiki/Jeff_Baxter",
    //       "license": "https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License",
    //       "articleBody": "Jeffrey Allen \"Skunk\" Baxter is an American guitarist, known for his stints in the rock bands Steely Dan and The Doobie Brothers during the 1970s and Spirit in the 1980s. "
    //     },
    //     "comments": [{
    //       "title": "What is your favorite Animal from TLA and LoK?",
    //       "score": 182,
    //       "ups": 182,
    //       "downs": 0,
    //       "body text": "Skunk-Bear?",
    //       "permalink": "www.reddit.com/r/TheLastAirbender/comments/1et0e7/what_is_your_favorite_animal_from_tla_and_lok/ca3hjj3/",
    //       "author name": "PedoKracker"
    //     }]
    //   }, {
    //     "recommendation": "Otters",
    //     "images": ["https://static01.nyt.com/images/2021/07/08/science/08TB-OTTERS1/08TB-OTTERS1-mobileMasterAt3x.jpg", "https://upload.wikimedia.org/wikipedia/commons/0/02/Sea_Otter_%28Enhydra_lutris%29_%2825169790524%29_crop.jpg", "https://ichef.bbci.co.uk/news/640/cpsprodpb/2A6B/production/_122995801_gettyimages-801476466-1.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Fischotter%2C_Lutra_Lutra.JPG/640px-Fischotter%2C_Lutra_Lutra.JPG", "https://images.immediate.co.uk/production/volatile/sites/23/2021/03/GettyImages-1345278193-0770904.jpg?quality=90&resize=768%2C574"],
    //     "score": 67.1,
    //     "link": "https://www.sitepoint.com/url-parameters-jquery/",
    //     "description": {
    //       "url": "https://en.wikipedia.org/wiki/Otter",
    //       "license": "https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License",
    //       "articleBody": "Otters are carnivorous mammals in the subfamily Lutrinae. The 13 extant otter species are all semiaquatic, aquatic or marine, with diets based on fish and invertebrates. "
    //     },
    //     "comments": [{
    //       "title": "What is your favorite animal?",
    //       "score": 43,
    //       "ups": 43,
    //       "downs": 0,
    //       "body text": "Otters are awesome! Their little paws are so cute. ",
    //       "permalink": "www.reddit.com/r/AskWomen/comments/1xzlzc/what_is_your_favorite_animal/cfg2mzp/",
    //       "author name": "retrievethekraken"
    //     }]
    //   }, {
    //     "recommendation": "paws",
    //     "images": ["https://pawsofcoronado.org/wp-content/uploads/2016/01/cropped-favicon.png", "https://www.treehugger.com/thmb/Kcyu-krLz7Uhc3X5-n4PCsZxtH0=/2122x1412/filters:fill(auto,1)/GettyImages-922841020-e4bf98b5345042c0b04b3884a2ed91a4.jpg", "https://www.petmd.com/sites/default/files/shutterstock_423982405.jpg", "https://static.wixstatic.com/media/6f21e4_cbd4b3f3e3d34a1e95dc12389d9188bc~mv2.png/v1/fit/w_2500,h_1330,al_c/6f21e4_cbd4b3f3e3d34a1e95dc12389d9188bc~mv2.png", "https://www.space4water.org/s4w/web/sites/default/files/images/software/logos/2020-07/paws-logo.png"],
    //     "score": 67.1,
    //     "link": "https://www.sitepoint.com/url-parameters-jquery/",
    //     "description": {
    //       "license": "https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License",
    //       "articleBody": "The Search for Santa Paws is a 2010 direct to video American-Canadian Christmas fantasy-adventure film released on November 23, 2010. ",
    //       "url": "https://en.wikipedia.org/wiki/The_Search_for_Santa_Paws"
    //     },
    //     "comments": [{
    //       "title": "What is your favorite animal?",
    //       "score": 43,
    //       "ups": 43,
    //       "downs": 0,
    //       "body text": "Otters are awesome! Their little paws are so cute. ",
    //       "permalink": "www.reddit.com/r/AskWomen/comments/1xzlzc/what_is_your_favorite_animal/cfg2mzp/",
    //       "author name": "retrievethekraken"
    //     }]
    //   }, {
    //     "recommendation": "Sokka",
    //     "images": ["https://static.wikia.nocookie.net/avatar/images/6/65/Appa_flying.png/revision/latest/top-crop/width/360/height/360?cb=20140517110636", "https://static.wikia.nocookie.net/295fe34c-4fff-4e01-ab40-93f0d24b5cce/scale-to-width/755", "https://static.wikia.nocookie.net/p__/images/0/06/Appa.png/revision/latest?cb=20180813222453&path-prefix=protagonist", "https://m.media-amazon.com/images/I/61y5KV49puL._AC_SL1000_.jpg", "https://upload.wikimedia.org/wikipedia/en/b/b4/Appa_and_Momo.png"],
    //     "score": 46.0,
    //     "link": "https://www.sitepoint.com/url-parameters-jquery/",
    //     "description": {
    //       "url": "https://en.wikipedia.org/wiki/Sokka",
    //       "license": "https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License",
    //       "articleBody": "Sokka is a fictional character in Nickelodeon's animated television series Avatar: The Last Airbender and its sequel series The Legend of Korra. "
    //     },
    //     "comments": [{
    //       "title": "What is your favorite Animal from TLA and LoK?",
    //       "score": 46,
    //       "ups": 46,
    //       "downs": 0,
    //       "body text": "[Sokka and his Moose Lion](http://moni158.deviantart.com/art/Sokka-and-his-Moose-lion-321920916)",
    //       "permalink": "www.reddit.com/r/TheLastAirbender/comments/1et0e7/what_is_your_favorite_animal_from_tla_and_lok/ca3sm2c/",
    //       "author name": "Joker9392"
    //     }]
    //   }, {
    //     "recommendation": "Appa",
    //     "images": ["https://static.wikia.nocookie.net/avatar/images/6/65/Appa_flying.png/revision/latest/top-crop/width/360/height/360?cb=20140517110636", "https://static.wikia.nocookie.net/295fe34c-4fff-4e01-ab40-93f0d24b5cce/scale-to-width/755", "https://static.wikia.nocookie.net/p__/images/0/06/Appa.png/revision/latest?cb=20180813222453&path-prefix=protagonist", "https://m.media-amazon.com/images/I/61y5KV49puL._AC_SL1000_.jpg", "https://upload.wikimedia.org/wikipedia/en/b/b4/Appa_and_Momo.png"],
    //     "score": 41.0,
    //     "link": "https://www.sitepoint.com/url-parameters-jquery/",
    //     "description": {
    //       "articleBody": "Appa is a fictional character on the Nickelodeon animated television series Avatar: The Last Airbender and in the film The Last Airbender. ",
    //       "url": "https://en.wikipedia.org/wiki/Appa_(character)",
    //       "license": "https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License"
    //     },
    //     "comments": [{
    //       "title": "What is your favorite Animal from TLA and LoK?",
    //       "score": 41,
    //       "ups": 41,
    //       "downs": 0,
    //       "body text": "Appa forever and always",
    //       "permalink": "www.reddit.com/r/TheLastAirbender/comments/1et0e7/what_is_your_favorite_animal_from_tla_and_lok/ca3iems/",
    //       "author name": "whydustealmyusername"
    //     }]
    //   }, {
    //     "recommendation": "Sloths",
    //     "images": ["https://files.worldwildlife.org/wwfcmsprod/images/Baby_Sloth_Hanging_iStock_3_12_2014/portrait_overview/4zhzw2pmf0_iStock_000016816803XLarge_mini.jpg", "https://upload.wikimedia.org/wikipedia/commons/b/be/Bicho-pregui%C3%A7a_3.jpg", "https://cdn.britannica.com/62/142062-050-E51AEF0F/sloth-tree-branch.jpg?w=400&h=300&c=crop", "https://i.guim.co.uk/img/media/1d3a1b588915aaae8d2ceefae6294414d7181077/0_100_5758_3455/master/5758.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=5a7552da71c715988803a0d764fc3390", "https://files.worldwildlife.org/wwfcmsprod/images/Sloth_3_12_2014/story_full_width/2a8fgktz30_sloth__c__Jorge_Salas_International_Expeditions.JPG"],
    //     "score": 30.1,
    //     "link": "https://www.sitepoint.com/url-parameters-jquery/",
    //     "description": {
    //       "license": "https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License",
    //       "url": "https://en.wikipedia.org/wiki/Sloth",
    //       "articleBody": "Sloths are a group of arboreal Neotropical xenarthran mammals, constituting the suborder Folivora. Noted for their slowness of movement, they spend most of their lives hanging upside down in the trees of the tropical rainforests of South America and Central America. "
    //     },
    //     "comments": [{
    //       "title": "What is your favorite animal?",
    //       "score": 23,
    //       "ups": 23,
    //       "downs": 0,
    //       "body text": "[Sloths!!!](http://imgur.com/tyz20gH). I just love how it always looks like they're smiling. ",
    //       "permalink": "www.reddit.com/r/AskWomen/comments/1xzlzc/what_is_your_favorite_animal/cfg1qp4/",
    //       "author name": "adga77"
    //     }]
    //   }, {
    //     "recommendation": "island turtle",
    //     "images": ["https://tce-live2.s3.amazonaws.com/media/new_article_images/dreamstime_xxl_54953777.jpg", "https://static.wikia.nocookie.net/shipoffools/images/c/cf/Turtle_Shell_Island.png/revision/latest?cb=20140510012740", "https://static.tvtropes.org/pmwiki/pub/images/turtle_island.jpg", "https://static.boredpanda.com/blog/wp-content/uploads/2020/01/20190925_135525-5e19ef7f8d833__880.jpg", "https://www.epaumc.org/wp-content/uploads/2017/11/38485737521_77950819c8_b.jpg"],
    //     "score": 21.9,
    //     "link": "https://www.sitepoint.com/url-parameters-jquery/",
    //     "description": {
    //       "articleBody": "Turtle Island is a name for Earth or North America, used by some Indigenous peoples in Canada and the United States, as well as by some Indigenous rights activists. ",
    //       "url": "https://en.wikipedia.org/wiki/Turtle_Island_(Native_American_folklore)",
    //       "license": "https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License"
    //     },
    //     "comments": [{
    //       "title": "What is your favorite Animal from TLA and LoK?",
    //       "score": 15,
    //       "ups": 15,
    //       "downs": 0,
    //       "body text": "Omg, that'd be amazing. Especially if there were something important on it's island/back.\n\nI just love the idea of an island turtle. Like Torterra.",
    //       "permalink": "www.reddit.com/r/TheLastAirbender/comments/1et0e7/what_is_your_favorite_animal_from_tla_and_lok/ca3ph13/",
    //       "author name": "[deleted]"
    //     }]
    //   }]
    // };
    console.log("parsedRes", parsedRes);
    recommendations = (parsedRes?.recommendations ?? []).map(({
                                                                recommendation,
                                                                images,
                                                                score,
                                                                link,
                                                                description,
                                                                comments
                                                              }) => {
      return {
        keyword: recommendation,
        description: description?.articleBody,
        score,
        imageUrls: images,
        comments: comments.map(comment => ({
          text: comment["body text"],
          score: comment.score,
          authorName: comment["author name"],
          url: comment.permalink
        })),
        link
      };
    });
    isLoading = false;
  };
</script>

<style>
</style>

<Tailwindcss />
<ModeSwitcher />
{#if isSearching}
  <SearchList {isLoading} {error} {recommendations} on:search={handleSearch} />
{:else}
  <Landing on:search={handleSearch} />
{/if}
