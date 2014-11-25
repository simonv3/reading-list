# A Reading List for Introverts

> Reading doesn't have to happen in public.

Below are the legacy instructions for building a hoodie app. They're here because it's probably the easiest way for you to get started while this README.md is figured out.

## Website

Once this is a bit more thoroughly working MMP-wise, it will probably be run on nodejitsu server. Check back for more details later!

## Run this locally

You'll need Git, Node, CouchDB, and NPM. This guide assumes you have them installed.

```
git pull git@github.com:simonv3/reading-list.git
```

Install all the NPM things:

```
npm install
```

and then just run 

```
hoodie start
```

and you'll have your very own reading list!

If you want to hack on the frontend, run:

```
gulp watch
```

you'll need a server running with hoodie on it (haven't yet figured out how to browsersync on the hoodie server)
