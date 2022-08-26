## MUST CREATE CHROME.EXE TO DISABLE SECURITY BEFORE RUNNING APPLICATION 
**1) Create a new Chrome shortcut (save to desktop or anywhere easily accesible)**

**2) Right-click on shortcut, select "Shortcut" tab if not already selected**

**3) Append the following to the "Target" field**

    --disable-web-security --user-data-dir="D:/Chrome"

**4) New "Target" should look something like this:**

    "C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="D:/Chrome"
**5) Close all instances of chrome**

**6) Open new Chrome shortcut to load application**

## Wishlist/Acknowledged Flaws: 
    -lazy loading
    -make mobile friendly (map specifically) 
    -font is bad
    -change map style
    -replace scss default theme
    -zoom out?
    -change color of radius
    -make global styles
    -API key public is not a production solution (can't access environment variable in index.html)
    -make function of geolocation service call
    -add window for markers
    -reverse geocode lat and lng to readable address
    -create reducer for form values
    -pagination for results