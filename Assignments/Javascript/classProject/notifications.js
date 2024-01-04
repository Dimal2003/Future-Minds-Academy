// 1. document.title = 'This is a new page title';
// 2. let faviconElement = document.querySelector("link[rel~='icon']") 
// faviconElement.href='favicon.io';
// 3. setInterval, clearInterval

let defaulTitle = document.title;
let faviconElement = document.querySelector("link[rel~='icon']"); 
let defaultFavicon = faviconElement.href;
let bellIconLink= getBellIconLink();;

let isInDefaultState = true;
let notificationInterval;

function startNotification(message){
  if(notificationInterval)
    endNotification();

   notificationInterval = setInterval(() => {
    if(isInDefaultState)
        setToNotification(message);
    else
      resetToDefaults();

    isInDefaultState = !isInDefaultState;
    
   }, 1000);
}

function endNotification(){
    resetToDefaults();
    clearInterval(notificationInterval);
    resetToDefaults();
}

function resetToDefaults(){
    document.title = defaulTitle;
    faviconElement.href = defaultFavicon;
}

function setToNotification(message){
  document.title = message;
  faviconElement.href = bellIconLink;
}

function getBellIconLink(){
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext('2d');
  context.font = '32px sans-serif'
  context.fillText('🔔',0,30);

  return canvas.toDataURL('image/png');
}