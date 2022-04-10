<script lang="ts">
  import ModeSwitcher from './ModeSwitcher.svelte';
  import Tailwindcss from './Tailwindcss.svelte';
  import Landing from './Landing.svelte';
  import SearchList from './SearchList.svelte';

  let isSearching = false;
  let isLoading = false;
  let recommendations = [];

  const handleSearch = async ({detail: query}) => {
    isSearching = true;
    isLoading = true;
    console.log(query);
    //const res = await fetch("https://us-central1-recommeddit.cloudfunctions.net/search?"
     // + new URLSearchParams({query}));
    //const parsedRes = await res.json();
    //recommendations = parsedRes.recommendations;
    recommendations = [
      {
        keyword: "Visual Studio Code",
        description: "Visual Studio Code, also commonly referred to as VS Code, is a source-code editor made by Microsoft for Windows, Linux and macOS. Features include support for debugging, syntax highlighting, intelligent code completion, snippets, code refactoring, and embedded Git.",
        score: 34.1399493999, // <- round to nearest 1 decimals
        imageUrls: ["https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?fit=crop&format=jpg&crop=4560,2565,x790,y784,safe", "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-chevrolet-corvette-z06-1607016574.jpg?crop=0.737xw:0.738xh;0.181xw,0.218xh&resize=640:*", "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lamborghini-sc18-alston-1542395842.jpg"],
        comments: [
          {
            text: "Visual Studio Code comes fairly complete out of the box, but there are many plugins available to extend its functionality.",
            score: 6,
            url: "https://www.reddit.com/"
          },
          {
            text: "Sometimes it doesn't tell you if you made a typo in a method name or if a method is not used and several other important features.",
            score: 5,
            url: "https://www.reddit.com/"
          },
          {
            text: "All it takes is one stop for all the features many people need.",
            score: 4,
            url: "https://www.reddit.com/"
          },
          {
            text: "VSCode available plug-ins can do everything I want it to. I have had some successful experiences with it, including: C/C++, Python, TypeScript+React+WebPack+Node. By successful I mean: code completion, debugging, error detection. For C# I'm still with it's older brother, VS, though.",
            score: 3,
            url: "https://www.reddit.com/"
          },
          {
            text: "VS-Code has the speed of Sublime and the power of WebStorm. Perhaps this is the best software that Microsoft has ever created.",
            score: 2,
            url: "https://www.reddit.com/"
          },
          {
            text: "Other IDEs specific to a language often offer better tools for deep programming.",
            score: 1,
            url: "https://www.reddit.com/"
          },
        ]
      },
      {
        keyword: "PyCharm",
        description: "PyCharm is an integrated development environment used in computer programming, specifically for the Python programming language. It is developed by the Czech company JetBrains.",
        score: 21.2324, // <- round to nearest 1 decimals
        imageUrls: ["https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?fit=crop&format=jpg&crop=4560,2565,x790,y784,safe", "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-chevrolet-corvette-z06-1607016574.jpg?crop=0.737xw:0.738xh;0.181xw,0.218xh&resize=640:*", "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lamborghini-sc18-alston-1542395842.jpg"],
        comments: [
          {
            text: "PyCharm includes sophisticated heuristics for determining what each variable type is and providing autocompletion suggestions for them.",
            score: 6,
            url: "https://www.reddit.com/"
          },
          {
            text: "Can use a lot of memory (several GBs), especially when dealing with large projects.",
            score: 5,
            url: "https://www.reddit.com/"
          },
          {
            text: "Best IDE for Python: It has everything that you can expect for a modern IDE . I am particularly impressed by the and a very convenient way to add python package. Debugger is very impressive: it adds temporary debug information directly in the source code (and of course remove them as soon you stop it).",
            score: 4,
            url: "https://www.reddit.com/"
          },
          {
            text: "A very quick way to download and activate a python package quickly in your local environment.",
            score: 3,
            url: "https://www.reddit.com/"
          },
          {
            text: "PyCharm can leverage run-time information when running your application with the built-in debugger to figure out what types can possibly be passed to which functions, etc.",
            score: 2,
            url: "https://www.reddit.com/"
          },
          {
            text: "There are many refactoring options including renaming and changing signature across entire projects. It also includes the an ability to preview changes before committing and exclude anything unwanted.",
            score: 1,
            url: "https://www.reddit.com/"
          },
        ]
      },
      {
        keyword: "Eclipse",
        description: "Eclipse is an integrated development environment used in computer programming. It contains a base workspace and an extensible plug-in system for customizing the environment. It is the second-most-popular IDE for Java development, and, until 2016, was the most popular.",
        score: 19.345, // <- round to nearest 1 decimals
        imageUrls: ["https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?fit=crop&format=jpg&crop=4560,2565,x790,y784,safe", "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-chevrolet-corvette-z06-1607016574.jpg?crop=0.737xw:0.738xh;0.181xw,0.218xh&resize=640:*", "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lamborghini-sc18-alston-1542395842.jpg"],
        comments: [
          {
            text: "There's an overly abundant presence of menus, this forces you to constantly click around the different menu structures; foreign ideas, like Views and Perspectives; strange menu choices, like configure settings located in Windows menu->Preferences.",
            score: 6,
            url: "https://www.reddit.com/"
          },
          {
            text: "Eclipse uses a custom compiler (which can also be used outside of Eclipse), which is often faster than the normal Java Compiler, especially for incremental compilation.",
            score: 5,
            url: "https://www.reddit.com/"
          },
          {
            text: "Fast, suitable for big projects, customizable, supports UML, many programming languages, plugins, and widgets vs NetBeans and JDeveloper. Support for Workspaces and Perspectives. Long term tested, free of charge, vs IntelliJ IDEA.",
            score: 4,
            url: "https://www.reddit.com/"
          },
          {
            text: "Thanks to the large variety of plugins and various configuration options, Eclipse is very customizable.",
            score: 3,
            url: "https://www.reddit.com/"
          },
          {
            text: "Eclipse is an open source project and free to use.",
            score: 2,
            url: "https://www.reddit.com/"
          },
          {
            text: "Shows threads, concurrency locks, and conditional breakpoints.",
            score: 1,
            url: "https://www.reddit.com/"
          },
        ]
      }
    ]

    isLoading = false;
  }
</script>

<style>
</style>

<Tailwindcss/>
<ModeSwitcher/>
{#if isSearching}
  <SearchList {isLoading} {recommendations}/>
{:else}
  <Landing on:search={handleSearch}/>
{/if}
