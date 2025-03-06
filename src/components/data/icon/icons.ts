const icons = [
  { name: 'child', type: 'regular', id: '632731bc5665e8fabc854018' },
  { name: 'balloon', type: 'solid', id: '632731bc5665e8fabc854017' },
  { name: 'coffee-bean', type: 'solid', id: '632731bc5665e8fabc854016' },
  { name: 'pear', type: 'solid', id: '632731bc5665e8fabc854015' },
  { name: 'sushi', type: 'solid', id: '632731bc5665e8fabc854014' },
  { name: 'sushi', type: 'regular', id: '632731bc5665e8fabc854013' },
  { name: 'shower', type: 'solid', id: '632731bc5665e8fabc854012' },
  { name: 'shower', type: 'regular', id: '632731bc5665e8fabc854011' },
  { name: 'typescript', type: 'logo', id: '632731bc5665e8fabc854010' },
  { name: 'graphql', type: 'logo', id: '632731bc5665e8fabc85400f' },
  { name: 'rfid', type: 'regular', id: '632731bc5665e8fabc85400e' },
  {
    name: 'universal-access',
    type: 'solid',
    id: '632731bc5665e8fabc85400d'
  },
  {
    name: 'universal-access',
    type: 'regular',
    id: '632731bc5665e8fabc85400c'
  },
  { name: 'castle', type: 'solid', id: '632731bc5665e8fabc85400b' },
  { name: 'shield-minus', type: 'solid', id: '632731bc5665e8fabc85400a' },
  {
    name: 'shield-minus',
    type: 'regular',
    id: '632731bc5665e8fabc854009'
  },
  { name: 'shield-plus', type: 'solid', id: '632731bc5665e8fabc854008' },
  {
    name: 'shield-plus',
    type: 'regular',
    id: '632731bc5665e8fabc854007'
  },
  {
    name: 'vertical-bottom',
    type: 'regular',
    id: '632731bc5665e8fabc854006'
  },
  {
    name: 'vertical-top',
    type: 'regular',
    id: '632731bc5665e8fabc854005'
  },
  {
    name: 'horizontal-right',
    type: 'regular',
    id: '632731bc5665e8fabc854004'
  },
  {
    name: 'horizontal-left',
    type: 'regular',
    id: '632731bc5665e8fabc854003'
  },
  {
    name: 'objects-vertical-bottom',
    type: 'solid',
    id: '632731bc5665e8fabc854002'
  },
  {
    name: 'objects-vertical-bottom',
    type: 'regular',
    id: '632731bc5665e8fabc854001'
  },
  {
    name: 'objects-vertical-center',
    type: 'solid',
    id: '632731bc5665e8fabc854000'
  },
  {
    name: 'objects-vertical-center',
    type: 'regular',
    id: '632731bc5665e8fabc853fff'
  },
  {
    name: 'objects-vertical-top',
    type: 'solid',
    id: '632731bc5665e8fabc853ffe'
  },
  {
    name: 'objects-vertical-top',
    type: 'regular',
    id: '632731bc5665e8fabc853ffd'
  },
  {
    name: 'objects-horizontal-right',
    type: 'solid',
    id: '632731bc5665e8fabc853ffc'
  },
  {
    name: 'objects-horizontal-right',
    type: 'regular',
    id: '632731bc5665e8fabc853ffb'
  },
  {
    name: 'objects-horizontal-center',
    type: 'solid',
    id: '632731bc5665e8fabc853ffa'
  },
  {
    name: 'objects-horizontal-center',
    type: 'regular',
    id: '632731bc5665e8fabc853ff9'
  },
  {
    name: 'objects-horizontal-left',
    type: 'solid',
    id: '632731bc5665e8fabc853ff8'
  },
  {
    name: 'objects-horizontal-left',
    type: 'regular',
    id: '632731bc5665e8fabc853ff7'
  },
  { name: 'color', type: 'solid', id: '62266889068cd7eda1e5b73c' },
  { name: 'color', type: 'regular', id: '62266889068cd7eda1e5b73b' },
  {
    name: 'reflect-horizontal',
    type: 'regular',
    id: '62266889068cd7eda1e5b73a'
  },
  {
    name: 'reflect-vertical',
    type: 'regular',
    id: '62266889068cd7eda1e5b739'
  },
  { name: 'postgresql', type: 'logo', id: '62266889068cd7eda1e5b738' },
  { name: 'mongodb', type: 'logo', id: '62266889068cd7eda1e5b737' },
  { name: 'deezer', type: 'logo', id: '62266889068cd7eda1e5b736' },
  { name: 'xing', type: 'logo', id: '62266889068cd7eda1e5b735' },
  { name: 'cart-add', type: 'regular', id: '62266889068cd7eda1e5b734' },
  {
    name: 'cart-download',
    type: 'regular',
    id: '62266889068cd7eda1e5b733'
  },
  { name: 'no-signal', type: 'regular', id: '62266889068cd7eda1e5b732' },
  { name: 'signal-5', type: 'regular', id: '62266889068cd7eda1e5b731' },
  { name: 'signal-4', type: 'regular', id: '62266889068cd7eda1e5b730' },
  { name: 'signal-3', type: 'regular', id: '62266889068cd7eda1e5b72f' },
  { name: 'signal-2', type: 'regular', id: '62266889068cd7eda1e5b72e' },
  { name: 'signal-1', type: 'regular', id: '62266889068cd7eda1e5b72d' },
  { name: 'cheese', type: 'solid', id: '62266889068cd7eda1e5b72c' },
  { name: 'cheese', type: 'regular', id: '62266889068cd7eda1e5b72b' },
  { name: 'hard-hat', type: 'solid', id: '62266889068cd7eda1e5b72a' },
  { name: 'hard-hat', type: 'regular', id: '62266889068cd7eda1e5b729' },
  { name: 'home-alt-2', type: 'solid', id: '62266889068cd7eda1e5b728' },
  { name: 'home-alt-2', type: 'regular', id: '62266889068cd7eda1e5b727' },
  { name: 'meta', type: 'logo', id: '61aaa1f6d608466fb295af14' },
  { name: 'lemon', type: 'solid', id: '61aaa1f6d608466fb295af13' },
  { name: 'lemon', type: 'regular', id: '61aaa1f6d608466fb295af12' },
  { name: 'cable-car', type: 'solid', id: '61aaa1f6d608466fb295af11' },
  { name: 'cable-car', type: 'regular', id: '61aaa1f6d608466fb295af10' },
  { name: 'cricket-ball', type: 'solid', id: '61aaa1f6d608466fb295af0f' },
  {
    name: 'cricket-ball',
    type: 'regular',
    id: '61aaa1f6d608466fb295af0e'
  },
  { name: 'tree-alt', type: 'solid', id: '61aaa1f6d608466fb295af0d' },
  {
    name: 'male-female',
    type: 'regular',
    id: '61aaa1f6d608466fb295af0c'
  },
  { name: 'invader', type: 'solid', id: '61aaa1f6d608466fb295af0b' },
  { name: 'baguette', type: 'solid', id: '61aaa1f6d608466fb295af0a' },
  { name: 'baguette', type: 'regular', id: '61aaa1f6d608466fb295af09' },
  { name: 'fork', type: 'regular', id: '61aaa1f6d608466fb295af08' },
  { name: 'knife', type: 'regular', id: '61aaa1f6d608466fb295af07' },
  { name: 'circle-half', type: 'solid', id: '61aaa1f6d608466fb295af06' },
  {
    name: 'circle-half',
    type: 'regular',
    id: '61aaa1f6d608466fb295af05'
  },
  {
    name: 'circle-three-quarter',
    type: 'solid',
    id: '61aaa1f6d608466fb295af04'
  },
  {
    name: 'circle-three-quarter',
    type: 'regular',
    id: '61aaa1f6d608466fb295af03'
  },
  {
    name: 'circle-quarter',
    type: 'solid',
    id: '61aaa1f6d608466fb295af02'
  },
  {
    name: 'circle-quarter',
    type: 'regular',
    id: '61aaa1f6d608466fb295af01'
  },
  { name: 'bowl-rice', type: 'solid', id: '61aaa1f6d608466fb295af00' },
  { name: 'bowl-rice', type: 'regular', id: '61aaa1f6d608466fb295aeff' },
  { name: 'bowl-hot', type: 'solid', id: '61aaa1f6d608466fb295aefe' },
  { name: 'bowl-hot', type: 'regular', id: '61aaa1f6d608466fb295aefd' },
  { name: 'popsicle', type: 'solid', id: '61aaa1f6d608466fb295aefc' },
  { name: 'popsicle', type: 'regular', id: '61aaa1f6d608466fb295aefb' },
  { name: 'cross', type: 'regular', id: '61aaa1f6d608466fb295aefa' },
  {
    name: 'scatter-chart',
    type: 'regular',
    id: '61aaa1f6d608466fb295aef9'
  },
  {
    name: 'money-withdraw',
    type: 'regular',
    id: '61aaa1f6d608466fb295aef8'
  },
  { name: 'candles', type: 'regular', id: '61aaa1f6d608466fb295aef7' },
  { name: 'math', type: 'regular', id: '61a83af962fa8bfc127b694f' },
  { name: 'party', type: 'regular', id: '61a83af962fa8bfc127b694e' },
  { name: 'leaf', type: 'regular', id: '61a83af962fa8bfc127b694d' },
  { name: 'injection', type: 'regular', id: '61a83af962fa8bfc127b694c' },
  {
    name: 'expand-vertical',
    type: 'regular',
    id: '61a83af962fa8bfc127b694b'
  },
  {
    name: 'expand-horizontal',
    type: 'regular',
    id: '61a83af962fa8bfc127b694a'
  },
  {
    name: 'collapse-vertical',
    type: 'regular',
    id: '61a83af962fa8bfc127b6949'
  },
  {
    name: 'collapse-horizontal',
    type: 'regular',
    id: '61a83af962fa8bfc127b6948'
  },
  {
    name: 'collapse-alt',
    type: 'regular',
    id: '61a83af962fa8bfc127b6947'
  },
  { name: 'party', type: 'solid', id: '61a83af962fa8bfc127b6946' },
  { name: 'leaf', type: 'solid', id: '61a83af962fa8bfc127b6945' },
  { name: 'injection', type: 'solid', id: '61a83af962fa8bfc127b6944' },
  { name: 'dog', type: 'solid', id: '61a83af962fa8bfc127b6943' },
  { name: 'cat', type: 'solid', id: '61a83af962fa8bfc127b6942' },
  { name: 'upwork', type: 'logo', id: '61a83af962fa8bfc127b6941' },
  { name: 'netlify', type: 'logo', id: '61a83af962fa8bfc127b6940' },
  { name: 'java', type: 'logo', id: '61a83af962fa8bfc127b693f' },
  { name: 'heroku', type: 'logo', id: '61a83af962fa8bfc127b693e' },
  { name: 'go-lang', type: 'logo', id: '61a83af962fa8bfc127b693d' },
  { name: 'gmail', type: 'logo', id: '61a83af962fa8bfc127b693c' },
  { name: 'flask', type: 'logo', id: '61a83af962fa8bfc127b693b' },
  { name: '99designs', type: 'logo', id: '61a83af962fa8bfc127b693a' },
  { name: 'venmo', type: 'logo', id: '61a83af962fa8bfc127b6939' },
  { name: 'qr', type: 'regular', id: '60f58410e6625f4915d9e6b8' },
  { name: 'qr-scan', type: 'regular', id: '60f58410e6625f4915d9e6b7' },
  { name: 'docker', type: 'logo', id: '60f58410e6625f4915d9e6b6' },
  { name: 'aws', type: 'logo', id: '60f58410e6625f4915d9e6b5' },
  { name: 'hand', type: 'solid', id: '60f58410e6625f4915d9e6b4' },
  { name: 'podcast', type: 'regular', id: '60f58410e6625f4915d9e6b3' },
  {
    name: 'checkbox-minus',
    type: 'solid',
    id: '60f58410e6625f4915d9e6b2'
  },
  {
    name: 'checkbox-minus',
    type: 'regular',
    id: '60f58410e6625f4915d9e6b1'
  },
  { name: 'speaker', type: 'solid', id: '60f58410e6625f4915d9e6b0' },
  { name: 'speaker', type: 'regular', id: '60f58410e6625f4915d9e6af' },
  { name: 'registered', type: 'solid', id: '60f58410e6625f4915d9e6ae' },
  { name: 'registered', type: 'regular', id: '60f58410e6625f4915d9e6ad' },
  { name: 'phone-off', type: 'solid', id: '60f58410e6625f4915d9e6ac' },
  { name: 'phone-off', type: 'regular', id: '60f58410e6625f4915d9e6ab' },
  { name: 'tiktok', type: 'logo', id: '60f58410e6625f4915d9e6aa' },
  { name: 'sketch', type: 'logo', id: '60f58410e6625f4915d9e6a9' },
  { name: 'steam', type: 'logo', id: '60f58410e6625f4915d9e6a8' },
  { name: 'trip-advisor', type: 'logo', id: '60f58410e6625f4915d9e6a7' },
  { name: 'visual-studio', type: 'logo', id: '60f58410e6625f4915d9e6a6' },
  { name: 'unity', type: 'logo', id: '60f58410e6625f4915d9e6a5' },
  { name: 'php', type: 'logo', id: '60f58410e6625f4915d9e6a4' },
  { name: 'discord-alt', type: 'logo', id: '60f58410e6625f4915d9e6a3' },
  { name: 'flutter', type: 'logo', id: '60f58410e6625f4915d9e6a2' },
  { name: 'mastodon', type: 'logo', id: '60f58410e6625f4915d9e6a1' },
  { name: 'tailwind-css', type: 'logo', id: '60f58410e6625f4915d9e6a0' },
  { name: 'buildings', type: 'regular', id: '60df19f0cd329a203f14df53' },
  { name: 'buildings', type: 'solid', id: '60df19f0cd329a203f14df52' },
  { name: 'store-alt', type: 'regular', id: '60df19f0cd329a203f14df51' },
  { name: 'store-alt', type: 'solid', id: '60df19f0cd329a203f14df50' },
  {
    name: 'bar-chart-alt-2',
    type: 'regular',
    id: '60df19f0cd329a203f14df4f'
  },
  {
    name: 'bar-chart-alt-2',
    type: 'solid',
    id: '60df19f0cd329a203f14df4e'
  },
  {
    name: 'message-dots',
    type: 'regular',
    id: '60df19f0cd329a203f14df4d'
  },
  { name: 'message-dots', type: 'solid', id: '60df19f0cd329a203f14df4c' },
  {
    name: 'message-rounded-dots',
    type: 'regular',
    id: '60df19f0cd329a203f14df4b'
  },
  {
    name: 'message-rounded-dots',
    type: 'solid',
    id: '60df19f0cd329a203f14df4a'
  },
  { name: 'devices', type: 'solid', id: '60df19f0cd329a203f14df49' },
  {
    name: 'memory-card',
    type: 'regular',
    id: '60df19f0cd329a203f14df48'
  },
  { name: 'memory-card', type: 'solid', id: '60df19f0cd329a203f14df47' },
  { name: 'wallet-alt', type: 'regular', id: '60df19f0cd329a203f14df46' },
  { name: 'wallet-alt', type: 'solid', id: '60df19f0cd329a203f14df45' },
  { name: 'bank', type: 'solid', id: '60df19f0cd329a203f14df44' },
  { name: 'slideshow', type: 'regular', id: '60df19f0cd329a203f14df43' },
  { name: 'slideshow', type: 'solid', id: '60df19f0cd329a203f14df42' },
  {
    name: 'message-square',
    type: 'regular',
    id: '60df19f0cd329a203f14df41'
  },
  {
    name: 'message-square-dots',
    type: 'regular',
    id: '60df19f0cd329a203f14df40'
  },
  {
    name: 'message-square',
    type: 'solid',
    id: '60df19f0cd329a203f14df3f'
  },
  {
    name: 'message-square-dots',
    type: 'solid',
    id: '60df19f0cd329a203f14df3e'
  },
  {
    name: 'book-content',
    type: 'regular',
    id: '60df19f0cd329a203f14df3d'
  },
  { name: 'book-content', type: 'solid', id: '60df19f0cd329a203f14df3c' },
  { name: 'chat', type: 'regular', id: '60df19f0cd329a203f14df3b' },
  { name: 'chat', type: 'solid', id: '60df19f0cd329a203f14df3a' },
  { name: 'edit-alt', type: 'regular', id: '60df19f0cd329a203f14df39' },
  { name: 'edit-alt', type: 'solid', id: '60df19f0cd329a203f14df38' },
  { name: 'mouse-alt', type: 'regular', id: '60df19f0cd329a203f14df37' },
  { name: 'mouse-alt', type: 'solid', id: '60df19f0cd329a203f14df36' },
  { name: 'bug-alt', type: 'regular', id: '60df19f0cd329a203f14df35' },
  { name: 'bug-alt', type: 'solid', id: '60df19f0cd329a203f14df34' },
  { name: 'notepad', type: 'regular', id: '60df19f0cd329a203f14df33' },
  { name: 'notepad', type: 'solid', id: '60df19f0cd329a203f14df32' },
  {
    name: 'video-recording',
    type: 'regular',
    id: '60df19f0cd329a203f14df31'
  },
  {
    name: 'video-recording',
    type: 'solid',
    id: '60df19f0cd329a203f14df30'
  },
  {
    name: 'shape-square',
    type: 'regular',
    id: '60df19f0cd329a203f14df2f'
  },
  {
    name: 'shape-triangle',
    type: 'regular',
    id: '60df19f0cd329a203f14df2e'
  },
  {
    name: 'direction-left',
    type: 'solid',
    id: '60df19f0cd329a203f14df2d'
  },
  { name: 'ghost', type: 'regular', id: '60df19f0cd329a203f14df2c' },
  { name: 'ghost', type: 'solid', id: '60df19f0cd329a203f14df2b' },
  { name: 'mail-send', type: 'regular', id: '60df19f0cd329a203f14df2a' },
  { name: 'code-alt', type: 'regular', id: '60df19f0cd329a203f14df29' },
  { name: 'grid', type: 'regular', id: '60df19f0cd329a203f14df28' },
  {
    name: 'quote-single-left',
    type: 'solid',
    id: '60df19f0cd329a203f14df27'
  },
  {
    name: 'quote-single-right',
    type: 'solid',
    id: '60df19f0cd329a203f14df26'
  },
  { name: 'user-pin', type: 'regular', id: '60df19f0cd329a203f14df25' },
  { name: 'user-pin', type: 'solid', id: '60df19f0cd329a203f14df24' },
  { name: 'run', type: 'regular', id: '60df19f0cd329a203f14df23' },
  { name: 'copy-alt', type: 'regular', id: '60df19f0cd329a203f14df22' },
  { name: 'copy-alt', type: 'solid', id: '60df19f0cd329a203f14df21' },
  {
    name: 'transfer-alt',
    type: 'regular',
    id: '60df19f0cd329a203f14df20'
  },
  { name: 'file-doc', type: 'solid', id: '60df19f0cd329a203f14df1f' },
  { name: 'file-html', type: 'solid', id: '60df19f0cd329a203f14df1e' },
  {
    name: 'comment-detail',
    type: 'solid',
    id: '60df19f0cd329a203f14df1d'
  },
  { name: 'comment-add', type: 'solid', id: '60df19f0cd329a203f14df1c' },
  { name: 'file-css', type: 'solid', id: '60df19f0cd329a203f14df1b' },
  { name: 'file-js', type: 'solid', id: '60df19f0cd329a203f14df1a' },
  { name: 'file-json', type: 'solid', id: '60df19f0cd329a203f14df19' },
  { name: 'file-md', type: 'solid', id: '60df19f0cd329a203f14df18' },
  { name: 'file-txt', type: 'solid', id: '60df19f0cd329a203f14df17' },
  { name: 'file-png', type: 'solid', id: '60df19f0cd329a203f14df16' },
  { name: 'file-jpg', type: 'solid', id: '60df19f0cd329a203f14df15' },
  { name: 'file-gif', type: 'solid', id: '60df19f0cd329a203f14df14' },
  { name: 'analyse', type: 'solid', id: '60df19f0cd329a203f14df13' },
  { name: 'book-open', type: 'regular', id: '60df19f0cd329a203f14df12' },
  {
    name: 'plane-take-off',
    type: 'solid',
    id: '60df19f0cd329a203f14df11'
  },
  { name: 'plane-land', type: 'solid', id: '60df19f0cd329a203f14df10' },
  { name: 'parking', type: 'solid', id: '60df19f0cd329a203f14df0f' },
  { name: 'id-card', type: 'solid', id: '60df19f0cd329a203f14df0e' },
  { name: 'adjust-alt', type: 'solid', id: '60df19f0cd329a203f14df0d' },
  { name: 'landscape', type: 'regular', id: '60df19f0cd329a203f14df0c' },
  { name: 'landscape', type: 'solid', id: '60df19f0cd329a203f14df0b' },
  { name: 'traffic', type: 'solid', id: '60df19f0cd329a203f14df0a' },
  { name: 'comment', type: 'regular', id: '60df19f0cd329a203f14df09' },
  { name: 'comment', type: 'solid', id: '60df19f0cd329a203f14df08' },
  {
    name: 'comment-dots',
    type: 'regular',
    id: '60df19f0cd329a203f14df07'
  },
  { name: 'comment-dots', type: 'solid', id: '60df19f0cd329a203f14df06' },
  { name: 'wine', type: 'solid', id: '60df19f0cd329a203f14df05' },
  { name: 'pyramid', type: 'regular', id: '60df19f0cd329a203f14df04' },
  { name: 'pyramid', type: 'solid', id: '60df19f0cd329a203f14df03' },
  { name: 'cylinder', type: 'regular', id: '60df19f0cd329a203f14df02' },
  { name: 'cylinder', type: 'solid', id: '60df19f0cd329a203f14df01' },
  { name: 'graduation', type: 'solid', id: '60df19f0cd329a203f14df00' },
  { name: 'lock-alt', type: 'regular', id: '60df19f0cd329a203f14deff' },
  { name: 'lock-alt', type: 'solid', id: '60df19f0cd329a203f14defe' },
  {
    name: 'lock-open-alt',
    type: 'regular',
    id: '60df19f0cd329a203f14defd'
  },
  {
    name: 'lock-open-alt',
    type: 'solid',
    id: '60df19f0cd329a203f14defc'
  },
  {
    name: 'hourglass-top',
    type: 'solid',
    id: '60df19f0cd329a203f14defb'
  },
  {
    name: 'hourglass-bottom',
    type: 'solid',
    id: '60df19f0cd329a203f14defa'
  },
  {
    name: 'left-arrow-alt',
    type: 'regular',
    id: '60df19f0cd329a203f14def9'
  },
  {
    name: 'right-arrow-alt',
    type: 'regular',
    id: '60df19f0cd329a203f14def8'
  },
  {
    name: 'up-arrow-alt',
    type: 'regular',
    id: '60df19f0cd329a203f14def7'
  },
  {
    name: 'down-arrow-alt',
    type: 'regular',
    id: '60df19f0cd329a203f14def6'
  },
  {
    name: 'shape-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14def5'
  },
  { name: 'cycling', type: 'regular', id: '60df19f0cd329a203f14def4' },
  { name: 'dna', type: 'regular', id: '60df19f0cd329a203f14def3' },
  {
    name: 'bowling-ball',
    type: 'regular',
    id: '60df19f0cd329a203f14def2'
  },
  { name: 'bowling-ball', type: 'solid', id: '60df19f0cd329a203f14def1' },
  {
    name: 'search-alt-2',
    type: 'regular',
    id: '60df19f0cd329a203f14def0'
  },
  { name: 'search-alt-2', type: 'solid', id: '60df19f0cd329a203f14deef' },
  {
    name: 'plus-medical',
    type: 'regular',
    id: '60df19f0cd329a203f14deee'
  },
  {
    name: 'street-view',
    type: 'regular',
    id: '60df19f0cd329a203f14deed'
  },
  { name: 'droplet', type: 'regular', id: '60df19f0cd329a203f14deec' },
  { name: 'droplet-half', type: 'solid', id: '60df19f0cd329a203f14deeb' },
  { name: 'paint-roll', type: 'regular', id: '60df19f0cd329a203f14deea' },
  { name: 'paint-roll', type: 'solid', id: '60df19f0cd329a203f14dee9' },
  {
    name: 'shield-alt-2',
    type: 'regular',
    id: '60df19f0cd329a203f14dee8'
  },
  { name: 'shield-alt-2', type: 'solid', id: '60df19f0cd329a203f14dee7' },
  { name: 'error-alt', type: 'regular', id: '60df19f0cd329a203f14dee6' },
  { name: 'error-alt', type: 'solid', id: '60df19f0cd329a203f14dee5' },
  { name: 'square', type: 'regular', id: '60df19f0cd329a203f14dee4' },
  { name: 'square', type: 'solid', id: '60df19f0cd329a203f14dee3' },
  {
    name: 'square-rounded',
    type: 'regular',
    id: '60df19f0cd329a203f14dee2'
  },
  {
    name: 'square-rounded',
    type: 'solid',
    id: '60df19f0cd329a203f14dee1'
  },
  { name: 'polygon', type: 'regular', id: '60df19f0cd329a203f14dee0' },
  { name: 'polygon', type: 'solid', id: '60df19f0cd329a203f14dedf' },
  { name: 'cube-alt', type: 'regular', id: '60df19f0cd329a203f14dede' },
  { name: 'cube-alt', type: 'solid', id: '60df19f0cd329a203f14dedd' },
  { name: 'cuboid', type: 'regular', id: '60df19f0cd329a203f14dedc' },
  { name: 'cuboid', type: 'solid', id: '60df19f0cd329a203f14dedb' },
  { name: 'user-voice', type: 'regular', id: '60df19f0cd329a203f14deda' },
  { name: 'user-voice', type: 'solid', id: '60df19f0cd329a203f14ded9' },
  {
    name: 'accessibility',
    type: 'regular',
    id: '60df19f0cd329a203f14ded8'
  },
  {
    name: 'building-house',
    type: 'regular',
    id: '60df19f0cd329a203f14ded7'
  },
  {
    name: 'building-house',
    type: 'solid',
    id: '60df19f0cd329a203f14ded6'
  },
  {
    name: 'doughnut-chart',
    type: 'regular',
    id: '60df19f0cd329a203f14ded5'
  },
  {
    name: 'doughnut-chart',
    type: 'solid',
    id: '60df19f0cd329a203f14ded4'
  },
  { name: 'circle', type: 'solid', id: '60df19f0cd329a203f14ded3' },
  {
    name: 'log-in-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14ded2'
  },
  {
    name: 'log-in-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14ded1'
  },
  {
    name: 'log-out-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14ded0'
  },
  {
    name: 'log-out-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14decf'
  },
  { name: 'log-in', type: 'solid', id: '60df19f0cd329a203f14dece' },
  { name: 'log-out', type: 'solid', id: '60df19f0cd329a203f14decd' },
  { name: 'notification', type: 'solid', id: '60df19f0cd329a203f14decc' },
  {
    name: 'notification-off',
    type: 'solid',
    id: '60df19f0cd329a203f14decb'
  },
  {
    name: 'check-square',
    type: 'regular',
    id: '60df19f0cd329a203f14deca'
  },
  { name: 'check-square', type: 'solid', id: '60df19f0cd329a203f14dec9' },
  {
    name: 'message-alt',
    type: 'regular',
    id: '60df19f0cd329a203f14dec8'
  },
  { name: 'message-alt', type: 'solid', id: '60df19f0cd329a203f14dec7' },
  {
    name: 'message-alt-dots',
    type: 'regular',
    id: '60df19f0cd329a203f14dec6'
  },
  {
    name: 'message-alt-dots',
    type: 'solid',
    id: '60df19f0cd329a203f14dec5'
  },
  { name: 'no-entry', type: 'regular', id: '60df19f0cd329a203f14dec4' },
  { name: 'no-entry', type: 'solid', id: '60df19f0cd329a203f14dec3' },
  {
    name: 'traffic-barrier',
    type: 'solid',
    id: '60df19f0cd329a203f14dec2'
  },
  { name: 'component', type: 'solid', id: '60df19f0cd329a203f14dec1' },
  { name: 'plane-alt', type: 'solid', id: '60df19f0cd329a203f14dec0' },
  { name: 'palette', type: 'regular', id: '60df19f0cd329a203f14debf' },
  { name: 'palette', type: 'solid', id: '60df19f0cd329a203f14debe' },
  { name: 'basket', type: 'regular', id: '60df19f0cd329a203f14debd' },
  { name: 'basket', type: 'solid', id: '60df19f0cd329a203f14debc' },
  {
    name: 'purchase-tag-alt',
    type: 'regular',
    id: '60df19f0cd329a203f14debb'
  },
  {
    name: 'purchase-tag-alt',
    type: 'solid',
    id: '60df19f0cd329a203f14deba'
  },
  { name: 'receipt', type: 'regular', id: '60df19f0cd329a203f14deb9' },
  { name: 'receipt', type: 'solid', id: '60df19f0cd329a203f14deb8' },
  { name: 'line-chart', type: 'regular', id: '60df19f0cd329a203f14deb7' },
  { name: 'map-pin', type: 'regular', id: '60df19f0cd329a203f14deb6' },
  { name: 'map-pin', type: 'solid', id: '60df19f0cd329a203f14deb5' },
  { name: 'hive', type: 'regular', id: '60df19f0cd329a203f14deb4' },
  { name: 'band-aid', type: 'regular', id: '60df19f0cd329a203f14deb3' },
  { name: 'band-aid', type: 'solid', id: '60df19f0cd329a203f14deb2' },
  {
    name: 'credit-card-alt',
    type: 'regular',
    id: '60df19f0cd329a203f14deb1'
  },
  {
    name: 'credit-card-alt',
    type: 'solid',
    id: '60df19f0cd329a203f14deb0'
  },
  { name: 'credit-card', type: 'solid', id: '60df19f0cd329a203f14deaf' },
  { name: 'wifi-off', type: 'regular', id: '60df19f0cd329a203f14deae' },
  { name: 'paint', type: 'solid', id: '60df19f0cd329a203f14dead' },
  {
    name: 'brightness-half',
    type: 'regular',
    id: '60df19f0cd329a203f14deac'
  },
  {
    name: 'brightness-half',
    type: 'solid',
    id: '60df19f0cd329a203f14deab'
  },
  { name: 'brightness', type: 'regular', id: '60df19f0cd329a203f14deaa' },
  { name: 'brightness', type: 'solid', id: '60df19f0cd329a203f14dea9' },
  { name: 'filter-alt', type: 'regular', id: '60df19f0cd329a203f14dea8' },
  {
    name: 'dialpad-alt',
    type: 'regular',
    id: '60df19f0cd329a203f14dea7'
  },
  {
    name: 'border-right',
    type: 'regular',
    id: '60df19f0cd329a203f14dea6'
  },
  {
    name: 'border-left',
    type: 'regular',
    id: '60df19f0cd329a203f14dea5'
  },
  { name: 'border-top', type: 'regular', id: '60df19f0cd329a203f14dea4' },
  {
    name: 'border-bottom',
    type: 'regular',
    id: '60df19f0cd329a203f14dea3'
  },
  { name: 'border-all', type: 'regular', id: '60df19f0cd329a203f14dea2' },
  {
    name: 'mobile-landscape',
    type: 'regular',
    id: '60df19f0cd329a203f14dea1'
  },
  {
    name: 'mobile-vibration',
    type: 'regular',
    id: '60df19f0cd329a203f14dea0'
  },
  { name: 'rectangle', type: 'solid', id: '60df19f0cd329a203f14de9f' },
  { name: 'right-arrow', type: 'solid', id: '60df19f0cd329a203f14de9e' },
  { name: 'left-arrow', type: 'solid', id: '60df19f0cd329a203f14de9d' },
  { name: 'up-arrow', type: 'solid', id: '60df19f0cd329a203f14de9c' },
  { name: 'down-arrow', type: 'solid', id: '60df19f0cd329a203f14de9b' },
  {
    name: 'right-top-arrow-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14de9a'
  },
  {
    name: 'right-down-arrow-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14de99'
  },
  {
    name: 'left-top-arrow-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14de98'
  },
  {
    name: 'left-down-arrow-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14de97'
  },
  { name: 'institution', type: 'solid', id: '60df19f0cd329a203f14de96' },
  { name: 'school', type: 'solid', id: '60df19f0cd329a203f14de95' },
  { name: 'chalkboard', type: 'solid', id: '60df19f0cd329a203f14de94' },
  {
    name: 'skip-previous-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14de93'
  },
  {
    name: 'skip-next-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14de92'
  },
  { name: 'data', type: 'solid', id: '60df19f0cd329a203f14de91' },
  { name: 'mobile', type: 'solid', id: '60df19f0cd329a203f14de90' },
  { name: 'folder-minus', type: 'solid', id: '60df19f0cd329a203f14de8f' },
  { name: 'bell-plus', type: 'solid', id: '60df19f0cd329a203f14de8e' },
  { name: 'bell-minus', type: 'solid', id: '60df19f0cd329a203f14de8d' },
  { name: 'search', type: 'solid', id: '60df19f0cd329a203f14de8c' },
  { name: 'zoom-in', type: 'solid', id: '60df19f0cd329a203f14de8b' },
  { name: 'zoom-out', type: 'solid', id: '60df19f0cd329a203f14de8a' },
  { name: 'grid', type: 'solid', id: '60df19f0cd329a203f14de89' },
  { name: 'user-x', type: 'solid', id: '60df19f0cd329a203f14de88' },
  { name: 'user-check', type: 'solid', id: '60df19f0cd329a203f14de87' },
  { name: 'compass', type: 'solid', id: '60df19f0cd329a203f14de86' },
  { name: 'gas-pump', type: 'regular', id: '60df19f0cd329a203f14de85' },
  { name: 'stopwatch', type: 'solid', id: '60df19f0cd329a203f14de84' },
  { name: 'timer', type: 'solid', id: '60df19f0cd329a203f14de83' },
  { name: 'time', type: 'solid', id: '60df19f0cd329a203f14de82' },
  {
    name: 'pie-chart-alt-2',
    type: 'regular',
    id: '60df19f0cd329a203f14de81'
  },
  {
    name: 'pie-chart-alt-2',
    type: 'solid',
    id: '60df19f0cd329a203f14de80'
  },
  { name: 'time-five', type: 'regular', id: '60df19f0cd329a203f14de7f' },
  { name: 'time-five', type: 'solid', id: '60df19f0cd329a203f14de7e' },
  { name: 'instagram-alt', type: 'logo', id: '60df19f0cd329a203f14de7d' },
  { name: 'bookmarks', type: 'solid', id: '60df19f0cd329a203f14de7c' },
  {
    name: 'bookmark-minus',
    type: 'solid',
    id: '60df19f0cd329a203f14de7b'
  },
  {
    name: 'briefcase-alt-2',
    type: 'regular',
    id: '60df19f0cd329a203f14de7a'
  },
  {
    name: 'briefcase-alt-2',
    type: 'solid',
    id: '60df19f0cd329a203f14de79'
  },
  { name: 'brush-alt', type: 'regular', id: '60df19f0cd329a203f14de78' },
  { name: 'calendar', type: 'solid', id: '60df19f0cd329a203f14de77' },
  { name: 'calendar-alt', type: 'solid', id: '60df19f0cd329a203f14de76' },
  {
    name: 'calendar-plus',
    type: 'solid',
    id: '60df19f0cd329a203f14de75'
  },
  {
    name: 'calendar-minus',
    type: 'solid',
    id: '60df19f0cd329a203f14de74'
  },
  { name: 'calendar-x', type: 'solid', id: '60df19f0cd329a203f14de73' },
  {
    name: 'calendar-check',
    type: 'solid',
    id: '60df19f0cd329a203f14de72'
  },
  {
    name: 'calendar-event',
    type: 'solid',
    id: '60df19f0cd329a203f14de71'
  },
  { name: 'customize', type: 'regular', id: '60df19f0cd329a203f14de70' },
  { name: 'customize', type: 'solid', id: '60df19f0cd329a203f14de6f' },
  { name: 'carousel', type: 'solid', id: '60df19f0cd329a203f14de6e' },
  {
    name: 'rewind-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14de6d'
  },
  {
    name: 'fast-forward-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14de6c'
  },
  {
    name: 'mobile-vibration',
    type: 'solid',
    id: '60df19f0cd329a203f14de6b'
  },
  {
    name: 'quote-alt-left',
    type: 'solid',
    id: '60df19f0cd329a203f14de6a'
  },
  {
    name: 'quote-alt-right',
    type: 'solid',
    id: '60df19f0cd329a203f14de69'
  },
  { name: 'layout', type: 'solid', id: '60df19f0cd329a203f14de68' },
  { name: 'radio', type: 'regular', id: '60df19f0cd329a203f14de67' },
  { name: 'printer', type: 'regular', id: '60df19f0cd329a203f14de66' },
  { name: 'sort-a-z', type: 'regular', id: '60df19f0cd329a203f14de65' },
  { name: 'sort-z-a', type: 'regular', id: '60df19f0cd329a203f14de64' },
  {
    name: 'conversation',
    type: 'regular',
    id: '60df19f0cd329a203f14de63'
  },
  { name: 'brush-alt', type: 'solid', id: '60df19f0cd329a203f14de62' },
  { name: 'exit', type: 'regular', id: '60df19f0cd329a203f14de61' },
  { name: 'exit', type: 'solid', id: '60df19f0cd329a203f14de60' },
  { name: 'extension', type: 'regular', id: '60df19f0cd329a203f14de5f' },
  { name: 'extension', type: 'solid', id: '60df19f0cd329a203f14de5e' },
  { name: 'file-find', type: 'solid', id: '60df19f0cd329a203f14de5d' },
  { name: 'face', type: 'regular', id: '60df19f0cd329a203f14de5c' },
  { name: 'face', type: 'solid', id: '60df19f0cd329a203f14de5b' },
  { name: 'file-find', type: 'regular', id: '60df19f0cd329a203f14de5a' },
  { name: 'label', type: 'regular', id: '60df19f0cd329a203f14de59' },
  { name: 'label', type: 'solid', id: '60df19f0cd329a203f14de58' },
  {
    name: 'check-shield',
    type: 'regular',
    id: '60df19f0cd329a203f14de57'
  },
  { name: 'check-shield', type: 'solid', id: '60df19f0cd329a203f14de56' },
  {
    name: 'border-radius',
    type: 'regular',
    id: '60df19f0cd329a203f14de55'
  },
  {
    name: 'add-to-queue',
    type: 'regular',
    id: '60df19f0cd329a203f14de54'
  },
  { name: 'add-to-queue', type: 'solid', id: '60df19f0cd329a203f14de53' },
  { name: 'archive-in', type: 'regular', id: '60df19f0cd329a203f14de52' },
  { name: 'archive-in', type: 'solid', id: '60df19f0cd329a203f14de51' },
  {
    name: 'archive-out',
    type: 'regular',
    id: '60df19f0cd329a203f14de50'
  },
  { name: 'archive-out', type: 'solid', id: '60df19f0cd329a203f14de4f' },
  { name: 'alarm-add', type: 'regular', id: '60df19f0cd329a203f14de4e' },
  { name: 'alarm-add', type: 'solid', id: '60df19f0cd329a203f14de4d' },
  { name: 'space-bar', type: 'regular', id: '60df19f0cd329a203f14de4c' },
  { name: 'image-alt', type: 'regular', id: '60df19f0cd329a203f14de4b' },
  { name: 'image-add', type: 'regular', id: '60df19f0cd329a203f14de4a' },
  { name: 'image-add', type: 'solid', id: '60df19f0cd329a203f14de49' },
  { name: 'fridge', type: 'regular', id: '60df19f0cd329a203f14de48' },
  { name: 'fridge', type: 'solid', id: '60df19f0cd329a203f14de47' },
  { name: 'dish', type: 'regular', id: '60df19f0cd329a203f14de46' },
  { name: 'dish', type: 'solid', id: '60df19f0cd329a203f14de45' },
  { name: 'spa', type: 'regular', id: '60df19f0cd329a203f14de44' },
  { name: 'spa', type: 'solid', id: '60df19f0cd329a203f14de43' },
  { name: 'cake', type: 'regular', id: '60df19f0cd329a203f14de42' },
  { name: 'cake', type: 'solid', id: '60df19f0cd329a203f14de41' },
  { name: 'city', type: 'solid', id: '60df19f0cd329a203f14de40' },
  {
    name: 'bolt-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14de3f'
  },
  { name: 'bolt-circle', type: 'solid', id: '60df19f0cd329a203f14de3e' },
  { name: 'tone', type: 'regular', id: '60df19f0cd329a203f14de3d' },
  { name: 'bitcoin', type: 'regular', id: '60df19f0cd329a203f14de3c' },
  { name: 'lira', type: 'regular', id: '60df19f0cd329a203f14de3b' },
  { name: 'ruble', type: 'regular', id: '60df19f0cd329a203f14de3a' },
  {
    name: 'caret-up-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14de39'
  },
  {
    name: 'caret-down-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14de38'
  },
  {
    name: 'caret-left-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14de37'
  },
  {
    name: 'caret-right-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14de36'
  },
  { name: 'rupee', type: 'regular', id: '60df19f0cd329a203f14de35' },
  { name: 'euro', type: 'regular', id: '60df19f0cd329a203f14de34' },
  { name: 'pound', type: 'regular', id: '60df19f0cd329a203f14de33' },
  { name: 'won', type: 'regular', id: '60df19f0cd329a203f14de32' },
  { name: 'yen', type: 'regular', id: '60df19f0cd329a203f14de31' },
  { name: 'shekel', type: 'regular', id: '60df19f0cd329a203f14de30' },
  {
    name: 'facebook-circle',
    type: 'logo',
    id: '60df19f0cd329a203f14de2f'
  },
  { name: 'jquery', type: 'logo', id: '60df19f0cd329a203f14de2e' },
  { name: 'imdb', type: 'logo', id: '60df19f0cd329a203f14de2d' },
  { name: 'pinterest-alt', type: 'logo', id: '60df19f0cd329a203f14de2c' },
  { name: 'tone', type: 'solid', id: '60df19f0cd329a203f14de2b' },
  { name: 'health', type: 'regular', id: '60df19f0cd329a203f14de2a' },
  {
    name: 'baby-carriage',
    type: 'solid',
    id: '60df19f0cd329a203f14de29'
  },
  { name: 'clinic', type: 'regular', id: '60df19f0cd329a203f14de28' },
  { name: 'hand-up', type: 'solid', id: '60df19f0cd329a203f14de27' },
  { name: 'hand-right', type: 'solid', id: '60df19f0cd329a203f14de26' },
  { name: 'hand-down', type: 'solid', id: '60df19f0cd329a203f14de25' },
  { name: 'hand-left', type: 'solid', id: '60df19f0cd329a203f14de24' },
  { name: 'male', type: 'regular', id: '60df19f0cd329a203f14de23' },
  { name: 'female', type: 'regular', id: '60df19f0cd329a203f14de22' },
  { name: 'male-sign', type: 'regular', id: '60df19f0cd329a203f14de21' },
  {
    name: 'female-sign',
    type: 'regular',
    id: '60df19f0cd329a203f14de20'
  },
  { name: 'clinic', type: 'solid', id: '60df19f0cd329a203f14de1f' },
  { name: 'offer', type: 'solid', id: '60df19f0cd329a203f14de1e' },
  { name: 'food-tag', type: 'regular', id: '60df19f0cd329a203f14de1d' },
  { name: 'food-menu', type: 'regular', id: '60df19f0cd329a203f14de1c' },
  { name: 'food-menu', type: 'solid', id: '60df19f0cd329a203f14de1b' },
  { name: 'camera-plus', type: 'solid', id: '60df19f0cd329a203f14de1a' },
  { name: 'business', type: 'solid', id: '60df19f0cd329a203f14de19' },
  { name: 'meh-alt', type: 'regular', id: '60df19f0cd329a203f14de18' },
  {
    name: 'wink-tongue',
    type: 'regular',
    id: '60df19f0cd329a203f14de17'
  },
  { name: 'happy-alt', type: 'regular', id: '60df19f0cd329a203f14de16' },
  { name: 'cool', type: 'regular', id: '60df19f0cd329a203f14de15' },
  { name: 'tired', type: 'regular', id: '60df19f0cd329a203f14de14' },
  { name: 'smile', type: 'regular', id: '60df19f0cd329a203f14de13' },
  { name: 'angry', type: 'regular', id: '60df19f0cd329a203f14de12' },
  {
    name: 'happy-heart-eyes',
    type: 'regular',
    id: '60df19f0cd329a203f14de11'
  },
  { name: 'dizzy', type: 'regular', id: '60df19f0cd329a203f14de10' },
  { name: 'wink-smile', type: 'regular', id: '60df19f0cd329a203f14de0f' },
  { name: 'confused', type: 'regular', id: '60df19f0cd329a203f14de0e' },
  { name: 'sleepy', type: 'regular', id: '60df19f0cd329a203f14de0d' },
  { name: 'shocked', type: 'regular', id: '60df19f0cd329a203f14de0c' },
  {
    name: 'happy-beaming',
    type: 'regular',
    id: '60df19f0cd329a203f14de0b'
  },
  { name: 'meh-blank', type: 'regular', id: '60df19f0cd329a203f14de0a' },
  { name: 'laugh', type: 'regular', id: '60df19f0cd329a203f14de09' },
  {
    name: 'upside-down',
    type: 'regular',
    id: '60df19f0cd329a203f14de08'
  },
  { name: 'angry', type: 'solid', id: '60df19f0cd329a203f14de07' },
  {
    name: 'happy-heart-eyes',
    type: 'solid',
    id: '60df19f0cd329a203f14de06'
  },
  { name: 'dizzy', type: 'solid', id: '60df19f0cd329a203f14de05' },
  { name: 'wink-smile', type: 'solid', id: '60df19f0cd329a203f14de04' },
  { name: 'smile', type: 'solid', id: '60df19f0cd329a203f14de03' },
  { name: 'meh', type: 'solid', id: '60df19f0cd329a203f14de02' },
  { name: 'meh-alt', type: 'solid', id: '60df19f0cd329a203f14de01' },
  { name: 'confused', type: 'solid', id: '60df19f0cd329a203f14de00' },
  { name: 'sleepy', type: 'solid', id: '60df19f0cd329a203f14ddff' },
  { name: 'sad', type: 'solid', id: '60df19f0cd329a203f14ddfe' },
  { name: 'happy', type: 'solid', id: '60df19f0cd329a203f14ddfd' },
  { name: 'shocked', type: 'solid', id: '60df19f0cd329a203f14ddfc' },
  {
    name: 'happy-beaming',
    type: 'solid',
    id: '60df19f0cd329a203f14ddfb'
  },
  { name: 'tired', type: 'solid', id: '60df19f0cd329a203f14ddfa' },
  { name: 'cool', type: 'solid', id: '60df19f0cd329a203f14ddf9' },
  { name: 'meh-blank', type: 'solid', id: '60df19f0cd329a203f14ddf8' },
  { name: 'laugh', type: 'solid', id: '60df19f0cd329a203f14ddf7' },
  { name: 'happy-alt', type: 'solid', id: '60df19f0cd329a203f14ddf6' },
  { name: 'upside-down', type: 'solid', id: '60df19f0cd329a203f14ddf5' },
  { name: 'wink-tongue', type: 'solid', id: '60df19f0cd329a203f14ddf4' },
  { name: 'adobe', type: 'logo', id: '60df19f0cd329a203f14ddf3' },
  { name: 'algolia', type: 'logo', id: '60df19f0cd329a203f14ddf2' },
  { name: 'audible', type: 'logo', id: '60df19f0cd329a203f14ddf1' },
  { name: 'figma', type: 'logo', id: '60df19f0cd329a203f14ddf0' },
  { name: 'etsy', type: 'logo', id: '60df19f0cd329a203f14ddef' },
  { name: 'gitlab', type: 'logo', id: '60df19f0cd329a203f14ddee' },
  { name: 'patreon', type: 'logo', id: '60df19f0cd329a203f14dded' },
  { name: 'redbubble', type: 'logo', id: '60df19f0cd329a203f14ddec' },
  { name: 'diamond', type: 'regular', id: '60df19f0cd329a203f14ddeb' },
  {
    name: 'comment-error',
    type: 'solid',
    id: '60df19f0cd329a203f14ddea'
  },
  { name: 'vial', type: 'solid', id: '60df19f0cd329a203f14dde9' },
  { name: 'align-left', type: 'regular', id: '60df19f0cd329a203f14dde8' },
  {
    name: 'align-middle',
    type: 'regular',
    id: '60df19f0cd329a203f14dde7'
  },
  {
    name: 'align-right',
    type: 'regular',
    id: '60df19f0cd329a203f14dde6'
  },
  { name: 'arrow-back', type: 'regular', id: '60df19f0cd329a203f14dde5' },
  { name: 'bell-minus', type: 'regular', id: '60df19f0cd329a203f14dde4' },
  { name: 'bell-off', type: 'regular', id: '60df19f0cd329a203f14dde3' },
  { name: 'bell-plus', type: 'regular', id: '60df19f0cd329a203f14dde2' },
  { name: 'bell', type: 'regular', id: '60df19f0cd329a203f14dde1' },
  { name: 'bookmark', type: 'regular', id: '60df19f0cd329a203f14dde0' },
  { name: 'bookmarks', type: 'regular', id: '60df19f0cd329a203f14dddf' },
  { name: 'bullseye', type: 'regular', id: '60df19f0cd329a203f14ddde' },
  { name: 'camera-off', type: 'regular', id: '60df19f0cd329a203f14dddd' },
  { name: 'camera', type: 'regular', id: '60df19f0cd329a203f14dddc' },
  { name: 'captions', type: 'regular', id: '60df19f0cd329a203f14dddb' },
  {
    name: 'checkbox-checked',
    type: 'regular',
    id: '60df19f0cd329a203f14ddda'
  },
  { name: 'checkbox', type: 'regular', id: '60df19f0cd329a203f14ddd9' },
  {
    name: 'checkbox-square',
    type: 'regular',
    id: '60df19f0cd329a203f14ddd8'
  },
  {
    name: 'chevron-down',
    type: 'regular',
    id: '60df19f0cd329a203f14ddd7'
  },
  { name: 'chevron-up', type: 'regular', id: '60df19f0cd329a203f14ddd6' },
  {
    name: 'chevron-left',
    type: 'regular',
    id: '60df19f0cd329a203f14ddd5'
  },
  {
    name: 'chevron-right',
    type: 'regular',
    id: '60df19f0cd329a203f14ddd4'
  },
  {
    name: 'chevrons-down',
    type: 'regular',
    id: '60df19f0cd329a203f14ddd3'
  },
  {
    name: 'chevrons-up',
    type: 'regular',
    id: '60df19f0cd329a203f14ddd2'
  },
  {
    name: 'chevrons-right',
    type: 'regular',
    id: '60df19f0cd329a203f14ddd1'
  },
  {
    name: 'chevrons-left',
    type: 'regular',
    id: '60df19f0cd329a203f14ddd0'
  },
  { name: 'clipboard', type: 'regular', id: '60df19f0cd329a203f14ddcf' },
  { name: 'code-curly', type: 'regular', id: '60df19f0cd329a203f14ddce' },
  { name: 'code', type: 'regular', id: '60df19f0cd329a203f14ddcd' },
  { name: 'coffee', type: 'regular', id: '60df19f0cd329a203f14ddcc' },
  { name: 'copy', type: 'regular', id: '60df19f0cd329a203f14ddcb' },
  { name: 'copyright', type: 'regular', id: '60df19f0cd329a203f14ddca' },
  {
    name: 'down-arrow-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14ddc9'
  },
  {
    name: 'error-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14ddc8'
  },
  { name: 'error', type: 'regular', id: '60df19f0cd329a203f14ddc7' },
  {
    name: 'exit-fullscreen',
    type: 'regular',
    id: '60df19f0cd329a203f14ddc6'
  },
  {
    name: 'fast-forward-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14ddc5'
  },
  {
    name: 'fast-forward',
    type: 'regular',
    id: '60df19f0cd329a203f14ddc4'
  },
  { name: 'first-page', type: 'regular', id: '60df19f0cd329a203f14ddc3' },
  {
    name: 'folder-minus',
    type: 'regular',
    id: '60df19f0cd329a203f14ddc2'
  },
  {
    name: 'folder-plus',
    type: 'regular',
    id: '60df19f0cd329a203f14ddc1'
  },
  { name: 'folder', type: 'regular', id: '60df19f0cd329a203f14ddc0' },
  { name: 'fullscreen', type: 'regular', id: '60df19f0cd329a203f14ddbf' },
  { name: 'hide', type: 'regular', id: '60df19f0cd329a203f14ddbe' },
  { name: 'image', type: 'regular', id: '60df19f0cd329a203f14ddbd' },
  {
    name: 'info-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14ddbc'
  },
  {
    name: 'align-justify',
    type: 'regular',
    id: '60df19f0cd329a203f14ddbb'
  },
  { name: 'key', type: 'regular', id: '60df19f0cd329a203f14ddba' },
  { name: 'last-page', type: 'regular', id: '60df19f0cd329a203f14ddb9' },
  {
    name: 'left-arrow-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14ddb8'
  },
  {
    name: 'left-down-arrow-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14ddb7'
  },
  {
    name: 'left-indent',
    type: 'regular',
    id: '60df19f0cd329a203f14ddb6'
  },
  {
    name: 'left-top-arrow-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14ddb5'
  },
  { name: 'menu', type: 'regular', id: '60df19f0cd329a203f14ddb4' },
  { name: 'microphone', type: 'regular', id: '60df19f0cd329a203f14ddb3' },
  {
    name: 'minus-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14ddb2'
  },
  { name: 'moon', type: 'regular', id: '60df19f0cd329a203f14ddb1' },
  {
    name: 'pause-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14ddb0'
  },
  { name: 'pause', type: 'regular', id: '60df19f0cd329a203f14ddaf' },
  {
    name: 'play-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14ddae'
  },
  { name: 'play', type: 'regular', id: '60df19f0cd329a203f14ddad' },
  {
    name: 'plus-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14ddac'
  },
  {
    name: 'question-mark',
    type: 'regular',
    id: '60df19f0cd329a203f14ddab'
  },
  {
    name: 'radio-circle-marked',
    type: 'regular',
    id: '60df19f0cd329a203f14ddaa'
  },
  {
    name: 'radio-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14dda9'
  },
  { name: 'rectangle', type: 'regular', id: '60df19f0cd329a203f14dda8' },
  { name: 'rewind', type: 'regular', id: '60df19f0cd329a203f14dda7' },
  { name: 'reset', type: 'regular', id: '60df19f0cd329a203f14dda6' },
  {
    name: 'right-arrow-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14dda5'
  },
  {
    name: 'right-down-arrow-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14dda4'
  },
  {
    name: 'right-indent',
    type: 'regular',
    id: '60df19f0cd329a203f14dda3'
  },
  {
    name: 'right-top-arrow-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14dda2'
  },
  { name: 'rss', type: 'regular', id: '60df19f0cd329a203f14dda1' },
  { name: 'search', type: 'regular', id: '60df19f0cd329a203f14dda0' },
  { name: 'show', type: 'regular', id: '60df19f0cd329a203f14dd9f' },
  { name: 'skip-next', type: 'regular', id: '60df19f0cd329a203f14dd9e' },
  {
    name: 'skip-previous',
    type: 'regular',
    id: '60df19f0cd329a203f14dd9d'
  },
  {
    name: 'stop-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14dd9c'
  },
  { name: 'stop', type: 'regular', id: '60df19f0cd329a203f14dd9b' },
  { name: 'stopwatch', type: 'regular', id: '60df19f0cd329a203f14dd9a' },
  { name: 'sync', type: 'regular', id: '60df19f0cd329a203f14dd99' },
  { name: 'time', type: 'regular', id: '60df19f0cd329a203f14dd98' },
  {
    name: 'toggle-left',
    type: 'regular',
    id: '60df19f0cd329a203f14dd97'
  },
  {
    name: 'toggle-right',
    type: 'regular',
    id: '60df19f0cd329a203f14dd96'
  },
  {
    name: 'trending-down',
    type: 'regular',
    id: '60df19f0cd329a203f14dd95'
  },
  {
    name: 'trending-up',
    type: 'regular',
    id: '60df19f0cd329a203f14dd94'
  },
  {
    name: 'up-arrow-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14dd93'
  },
  {
    name: 'vertical-center',
    type: 'regular',
    id: '60df19f0cd329a203f14dd92'
  },
  { name: 'video', type: 'regular', id: '60df19f0cd329a203f14dd91' },
  {
    name: 'volume-full',
    type: 'regular',
    id: '60df19f0cd329a203f14dd90'
  },
  { name: 'volume-low', type: 'regular', id: '60df19f0cd329a203f14dd8f' },
  {
    name: 'volume-mute',
    type: 'regular',
    id: '60df19f0cd329a203f14dd8e'
  },
  { name: 'volume', type: 'regular', id: '60df19f0cd329a203f14dd8d' },
  { name: 'x-circle', type: 'regular', id: '60df19f0cd329a203f14dd8c' },
  { name: 'zoom-in', type: 'regular', id: '60df19f0cd329a203f14dd8b' },
  { name: 'zoom-out', type: 'regular', id: '60df19f0cd329a203f14dd8a' },
  { name: 'archive', type: 'regular', id: '60df19f0cd329a203f14dd89' },
  { name: 'at', type: 'regular', id: '60df19f0cd329a203f14dd88' },
  {
    name: 'bar-chart-alt',
    type: 'regular',
    id: '60df19f0cd329a203f14dd87'
  },
  {
    name: 'bar-chart-square',
    type: 'regular',
    id: '60df19f0cd329a203f14dd86'
  },
  { name: 'bar-chart', type: 'regular', id: '60df19f0cd329a203f14dd85' },
  { name: 'basketball', type: 'regular', id: '60df19f0cd329a203f14dd84' },
  { name: 'block', type: 'regular', id: '60df19f0cd329a203f14dd83' },
  {
    name: 'book-bookmark',
    type: 'regular',
    id: '60df19f0cd329a203f14dd82'
  },
  { name: 'book', type: 'regular', id: '60df19f0cd329a203f14dd81' },
  {
    name: 'bookmark-minus',
    type: 'regular',
    id: '60df19f0cd329a203f14dd80'
  },
  {
    name: 'bookmark-plus',
    type: 'regular',
    id: '60df19f0cd329a203f14dd7f'
  },
  { name: 'briefcase', type: 'regular', id: '60df19f0cd329a203f14dd7e' },
  { name: 'broadcast', type: 'regular', id: '60df19f0cd329a203f14dd7d' },
  { name: 'building', type: 'regular', id: '60df19f0cd329a203f14dd7c' },
  { name: 'bug', type: 'regular', id: '60df19f0cd329a203f14dd7b' },
  { name: 'bluetooth', type: 'regular', id: '60df19f0cd329a203f14dd7a' },
  { name: 'bulb', type: 'regular', id: '60df19f0cd329a203f14dd79' },
  { name: 'buoy', type: 'regular', id: '60df19f0cd329a203f14dd78' },
  {
    name: 'calendar-plus',
    type: 'regular',
    id: '60df19f0cd329a203f14dd77'
  },
  {
    name: 'calendar-check',
    type: 'regular',
    id: '60df19f0cd329a203f14dd76'
  },
  {
    name: 'calendar-minus',
    type: 'regular',
    id: '60df19f0cd329a203f14dd75'
  },
  { name: 'calendar-x', type: 'regular', id: '60df19f0cd329a203f14dd74' },
  { name: 'calendar', type: 'regular', id: '60df19f0cd329a203f14dd73' },
  { name: 'chart', type: 'regular', id: '60df19f0cd329a203f14dd72' },
  {
    name: 'cloud-download',
    type: 'regular',
    id: '60df19f0cd329a203f14dd71'
  },
  {
    name: 'cloud-upload',
    type: 'regular',
    id: '60df19f0cd329a203f14dd70'
  },
  { name: 'cloud', type: 'regular', id: '60df19f0cd329a203f14dd6f' },
  { name: 'terminal', type: 'regular', id: '60df19f0cd329a203f14dd6e' },
  { name: 'crosshair', type: 'regular', id: '60df19f0cd329a203f14dd6d' },
  { name: 'compass', type: 'regular', id: '60df19f0cd329a203f14dd6c' },
  { name: 'data', type: 'regular', id: '60df19f0cd329a203f14dd6b' },
  { name: 'desktop', type: 'regular', id: '60df19f0cd329a203f14dd6a' },
  { name: 'directions', type: 'regular', id: '60df19f0cd329a203f14dd69' },
  { name: 'dollar', type: 'regular', id: '60df19f0cd329a203f14dd68' },
  {
    name: 'dots-horizontal-rounded',
    type: 'regular',
    id: '60df19f0cd329a203f14dd67'
  },
  {
    name: 'dots-horizontal',
    type: 'regular',
    id: '60df19f0cd329a203f14dd66'
  },
  {
    name: 'dots-vertical-rounded',
    type: 'regular',
    id: '60df19f0cd329a203f14dd65'
  },
  {
    name: 'dots-vertical',
    type: 'regular',
    id: '60df19f0cd329a203f14dd64'
  },
  { name: 'download', type: 'regular', id: '60df19f0cd329a203f14dd63' },
  { name: 'envelope', type: 'regular', id: '60df19f0cd329a203f14dd62' },
  { name: 'gift', type: 'regular', id: '60df19f0cd329a203f14dd61' },
  { name: 'globe', type: 'regular', id: '60df19f0cd329a203f14dd60' },
  { name: 'devices', type: 'regular', id: '60df19f0cd329a203f14dd5f' },
  { name: 'headphone', type: 'regular', id: '60df19f0cd329a203f14dd5e' },
  { name: 'heart', type: 'regular', id: '60df19f0cd329a203f14dd5d' },
  { name: 'home', type: 'regular', id: '60df19f0cd329a203f14dd5c' },
  { name: 'laptop', type: 'regular', id: '60df19f0cd329a203f14dd5b' },
  { name: 'layer', type: 'regular', id: '60df19f0cd329a203f14dd5a' },
  { name: 'link-alt', type: 'regular', id: '60df19f0cd329a203f14dd59' },
  { name: 'link', type: 'regular', id: '60df19f0cd329a203f14dd58' },
  { name: 'list-plus', type: 'regular', id: '60df19f0cd329a203f14dd57' },
  { name: 'list-ul', type: 'regular', id: '60df19f0cd329a203f14dd56' },
  { name: 'list-minus', type: 'regular', id: '60df19f0cd329a203f14dd55' },
  { name: 'lock-open', type: 'regular', id: '60df19f0cd329a203f14dd54' },
  { name: 'lock', type: 'regular', id: '60df19f0cd329a203f14dd53' },
  { name: 'map-alt', type: 'regular', id: '60df19f0cd329a203f14dd52' },
  { name: 'map', type: 'regular', id: '60df19f0cd329a203f14dd51' },
  {
    name: 'message-rounded',
    type: 'regular',
    id: '60df19f0cd329a203f14dd50'
  },
  { name: 'message', type: 'regular', id: '60df19f0cd329a203f14dd4f' },
  { name: 'mobile-alt', type: 'regular', id: '60df19f0cd329a203f14dd4e' },
  { name: 'mobile', type: 'regular', id: '60df19f0cd329a203f14dd4d' },
  { name: 'navigation', type: 'regular', id: '60df19f0cd329a203f14dd4c' },
  { name: 'phone', type: 'regular', id: '60df19f0cd329a203f14dd4b' },
  { name: 'pie-chart', type: 'regular', id: '60df19f0cd329a203f14dd4a' },
  { name: 'send', type: 'regular', id: '60df19f0cd329a203f14dd49' },
  { name: 'sidebar', type: 'regular', id: '60df19f0cd329a203f14dd48' },
  { name: 'sitemap', type: 'regular', id: '60df19f0cd329a203f14dd47' },
  {
    name: 'spreadsheet',
    type: 'regular',
    id: '60df19f0cd329a203f14dd46'
  },
  { name: 'tab', type: 'regular', id: '60df19f0cd329a203f14dd45' },
  { name: 'tag', type: 'regular', id: '60df19f0cd329a203f14dd44' },
  {
    name: 'target-lock',
    type: 'regular',
    id: '60df19f0cd329a203f14dd43'
  },
  {
    name: 'tennis-ball',
    type: 'regular',
    id: '60df19f0cd329a203f14dd42'
  },
  { name: 'alarm', type: 'regular', id: '60df19f0cd329a203f14dd41' },
  { name: 'upload', type: 'regular', id: '60df19f0cd329a203f14dd40' },
  { name: 'usb', type: 'regular', id: '60df19f0cd329a203f14dd3f' },
  { name: 'video-off', type: 'regular', id: '60df19f0cd329a203f14dd3e' },
  { name: 'voicemail', type: 'regular', id: '60df19f0cd329a203f14dd3d' },
  { name: 'wifi', type: 'regular', id: '60df19f0cd329a203f14dd3c' },
  {
    name: 'window-open',
    type: 'regular',
    id: '60df19f0cd329a203f14dd3b'
  },
  { name: 'window', type: 'regular', id: '60df19f0cd329a203f14dd3a' },
  { name: 'windows', type: 'regular', id: '60df19f0cd329a203f14dd39' },
  { name: 'duplicate', type: 'regular', id: '60df19f0cd329a203f14dd38' },
  { name: 'table', type: 'regular', id: '60df19f0cd329a203f14dd37' },
  { name: 'x', type: 'regular', id: '60df19f0cd329a203f14dd36' },
  { name: 'adjust', type: 'regular', id: '60df19f0cd329a203f14dd35' },
  { name: 'album', type: 'regular', id: '60df19f0cd329a203f14dd34' },
  { name: 'anchor', type: 'regular', id: '60df19f0cd329a203f14dd33' },
  { name: 'award', type: 'regular', id: '60df19f0cd329a203f14dd32' },
  { name: 'bold', type: 'regular', id: '60df19f0cd329a203f14dd31' },
  { name: 'calculator', type: 'regular', id: '60df19f0cd329a203f14dd30' },
  { name: 'cart', type: 'regular', id: '60df19f0cd329a203f14dd2f' },
  { name: 'check', type: 'regular', id: '60df19f0cd329a203f14dd2e' },
  {
    name: 'cloud-drizzle',
    type: 'regular',
    id: '60df19f0cd329a203f14dd2d'
  },
  {
    name: 'cloud-light-rain',
    type: 'regular',
    id: '60df19f0cd329a203f14dd2c'
  },
  {
    name: 'cloud-lightning',
    type: 'regular',
    id: '60df19f0cd329a203f14dd2b'
  },
  { name: 'cloud-rain', type: 'regular', id: '60df19f0cd329a203f14dd2a' },
  { name: 'cloud-snow', type: 'regular', id: '60df19f0cd329a203f14dd29' },
  { name: 'cog', type: 'regular', id: '60df19f0cd329a203f14dd28' },
  { name: 'columns', type: 'regular', id: '60df19f0cd329a203f14dd27' },
  {
    name: 'credit-card',
    type: 'regular',
    id: '60df19f0cd329a203f14dd26'
  },
  { name: 'crop', type: 'regular', id: '60df19f0cd329a203f14dd25' },
  { name: 'cube', type: 'regular', id: '60df19f0cd329a203f14dd24' },
  { name: 'cut', type: 'regular', id: '60df19f0cd329a203f14dd23' },
  { name: 'detail', type: 'regular', id: '60df19f0cd329a203f14dd22' },
  {
    name: 'shield-quarter',
    type: 'regular',
    id: '60df19f0cd329a203f14dd21'
  },
  { name: 'edit', type: 'regular', id: '60df19f0cd329a203f14dd20' },
  { name: 'file', type: 'regular', id: '60df19f0cd329a203f14dd1f' },
  { name: 'filter', type: 'regular', id: '60df19f0cd329a203f14dd1e' },
  { name: 'font', type: 'regular', id: '60df19f0cd329a203f14dd1d' },
  { name: 'git-branch', type: 'regular', id: '60df19f0cd329a203f14dd1c' },
  { name: 'git-commit', type: 'regular', id: '60df19f0cd329a203f14dd1b' },
  {
    name: 'git-compare',
    type: 'regular',
    id: '60df19f0cd329a203f14dd1a'
  },
  { name: 'git-merge', type: 'regular', id: '60df19f0cd329a203f14dd19' },
  {
    name: 'git-pull-request',
    type: 'regular',
    id: '60df19f0cd329a203f14dd18'
  },
  {
    name: 'git-repo-forked',
    type: 'regular',
    id: '60df19f0cd329a203f14dd17'
  },
  { name: 'group', type: 'regular', id: '60df19f0cd329a203f14dd16' },
  { name: 'hash', type: 'regular', id: '60df19f0cd329a203f14dd15' },
  { name: 'heading', type: 'regular', id: '60df19f0cd329a203f14dd14' },
  { name: 'home-alt', type: 'regular', id: '60df19f0cd329a203f14dd13' },
  { name: 'italic', type: 'regular', id: '60df19f0cd329a203f14dd12' },
  { name: 'joystick', type: 'regular', id: '60df19f0cd329a203f14dd11' },
  {
    name: 'link-external',
    type: 'regular',
    id: '60df19f0cd329a203f14dd10'
  },
  { name: 'log-in', type: 'regular', id: '60df19f0cd329a203f14dd0f' },
  { name: 'log-out', type: 'regular', id: '60df19f0cd329a203f14dd0e' },
  {
    name: 'microphone-off',
    type: 'regular',
    id: '60df19f0cd329a203f14dd0d'
  },
  { name: 'minus', type: 'regular', id: '60df19f0cd329a203f14dd0c' },
  { name: 'mouse', type: 'regular', id: '60df19f0cd329a203f14dd0b' },
  { name: 'move', type: 'regular', id: '60df19f0cd329a203f14dd0a' },
  { name: 'music', type: 'regular', id: '60df19f0cd329a203f14dd09' },
  {
    name: 'notification',
    type: 'regular',
    id: '60df19f0cd329a203f14dd08'
  },
  { name: 'package', type: 'regular', id: '60df19f0cd329a203f14dd07' },
  { name: 'paragraph', type: 'regular', id: '60df19f0cd329a203f14dd06' },
  { name: 'paste', type: 'regular', id: '60df19f0cd329a203f14dd05' },
  { name: 'pencil', type: 'regular', id: '60df19f0cd329a203f14dd04' },
  { name: 'pin', type: 'regular', id: '60df19f0cd329a203f14dd03' },
  { name: 'plus', type: 'regular', id: '60df19f0cd329a203f14dd02' },
  { name: 'power-off', type: 'regular', id: '60df19f0cd329a203f14dd01' },
  { name: 'pulse', type: 'regular', id: '60df19f0cd329a203f14dd00' },
  { name: 'save', type: 'regular', id: '60df19f0cd329a203f14dcff' },
  { name: 'screenshot', type: 'regular', id: '60df19f0cd329a203f14dcfe' },
  {
    name: 'select-multiple',
    type: 'regular',
    id: '60df19f0cd329a203f14dcfd'
  },
  { name: 'share-alt', type: 'regular', id: '60df19f0cd329a203f14dcfc' },
  { name: 'share', type: 'regular', id: '60df19f0cd329a203f14dcfb' },
  { name: 'shield-alt', type: 'regular', id: '60df19f0cd329a203f14dcfa' },
  { name: 'shield', type: 'regular', id: '60df19f0cd329a203f14dcf9' },
  {
    name: 'shopping-bag',
    type: 'regular',
    id: '60df19f0cd329a203f14dcf8'
  },
  { name: 'shuffle', type: 'regular', id: '60df19f0cd329a203f14dcf7' },
  { name: 'sort', type: 'regular', id: '60df19f0cd329a203f14dcf6' },
  { name: 'star', type: 'regular', id: '60df19f0cd329a203f14dcf5' },
  { name: 'sun', type: 'regular', id: '60df19f0cd329a203f14dcf4' },
  { name: 'text', type: 'regular', id: '60df19f0cd329a203f14dcf3' },
  { name: 'trash', type: 'regular', id: '60df19f0cd329a203f14dcf2' },
  { name: 'trophy', type: 'regular', id: '60df19f0cd329a203f14dcf1' },
  { name: 'underline', type: 'regular', id: '60df19f0cd329a203f14dcf0' },
  { name: 'user-check', type: 'regular', id: '60df19f0cd329a203f14dcef' },
  {
    name: 'user-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14dcee'
  },
  { name: 'user-minus', type: 'regular', id: '60df19f0cd329a203f14dced' },
  { name: 'user-plus', type: 'regular', id: '60df19f0cd329a203f14dcec' },
  { name: 'user-x', type: 'regular', id: '60df19f0cd329a203f14dceb' },
  { name: 'user', type: 'regular', id: '60df19f0cd329a203f14dcea' },
  { name: 'barcode', type: 'regular', id: '60df19f0cd329a203f14dce9' },
  { name: 'crown', type: 'regular', id: '60df19f0cd329a203f14dce8' },
  { name: 'dislike', type: 'regular', id: '60df19f0cd329a203f14dce7' },
  { name: 'down-arrow', type: 'regular', id: '60df19f0cd329a203f14dce6' },
  { name: 'export', type: 'regular', id: '60df19f0cd329a203f14dce5' },
  { name: 'facebook', type: 'logo', id: '60df19f0cd329a203f14dce4' },
  { name: 'first-aid', type: 'regular', id: '60df19f0cd329a203f14dce3' },
  { name: 'flag', type: 'regular', id: '60df19f0cd329a203f14dce2' },
  { name: 'github', type: 'logo', id: '60df19f0cd329a203f14dce1' },
  { name: 'google', type: 'logo', id: '60df19f0cd329a203f14dce0' },
  { name: 'history', type: 'regular', id: '60df19f0cd329a203f14dcdf' },
  { name: 'instagram', type: 'logo', id: '60df19f0cd329a203f14dcde' },
  {
    name: 'joystick-alt',
    type: 'regular',
    id: '60df19f0cd329a203f14dcdd'
  },
  { name: 'left-arrow', type: 'regular', id: '60df19f0cd329a203f14dcdc' },
  { name: 'like', type: 'regular', id: '60df19f0cd329a203f14dcdb' },
  { name: 'list-check', type: 'regular', id: '60df19f0cd329a203f14dcda' },
  { name: 'poll', type: 'regular', id: '60df19f0cd329a203f14dcd9' },
  { name: 'radar', type: 'regular', id: '60df19f0cd329a203f14dcd8' },
  { name: 'redo', type: 'regular', id: '60df19f0cd329a203f14dcd7' },
  { name: 'reply-all', type: 'regular', id: '60df19f0cd329a203f14dcd6' },
  { name: 'reply', type: 'regular', id: '60df19f0cd329a203f14dcd5' },
  { name: 'repost', type: 'regular', id: '60df19f0cd329a203f14dcd4' },
  { name: 'revision', type: 'regular', id: '60df19f0cd329a203f14dcd3' },
  {
    name: 'right-arrow',
    type: 'regular',
    id: '60df19f0cd329a203f14dcd2'
  },
  {
    name: 'subdirectory-left',
    type: 'regular',
    id: '60df19f0cd329a203f14dcd1'
  },
  {
    name: 'subdirectory-right',
    type: 'regular',
    id: '60df19f0cd329a203f14dcd0'
  },
  { name: 'support', type: 'regular', id: '60df19f0cd329a203f14dccf' },
  { name: 'timer', type: 'regular', id: '60df19f0cd329a203f14dcce' },
  { name: 'twitter', type: 'logo', id: '60df19f0cd329a203f14dccd' },
  { name: 'undo', type: 'regular', id: '60df19f0cd329a203f14dccc' },
  { name: 'up-arrow', type: 'regular', id: '60df19f0cd329a203f14dccb' },
  { name: 'youtube', type: 'logo', id: '60df19f0cd329a203f14dcca' },
  { name: 'whatsapp', type: 'logo', id: '60df19f0cd329a203f14dcc9' },
  { name: 'tumblr', type: 'logo', id: '60df19f0cd329a203f14dcc8' },
  { name: 'phone-call', type: 'regular', id: '60df19f0cd329a203f14dcc7' },
  { name: 'behance', type: 'logo', id: '60df19f0cd329a203f14dcc6' },
  { name: 'dribbble', type: 'logo', id: '60df19f0cd329a203f14dcc5' },
  { name: 'aperture', type: 'regular', id: '60df19f0cd329a203f14dcc4' },
  { name: 'film', type: 'regular', id: '60df19f0cd329a203f14dcc3' },
  {
    name: 'folder-open',
    type: 'regular',
    id: '60df19f0cd329a203f14dcc2'
  },
  { name: 'task', type: 'regular', id: '60df19f0cd329a203f14dcc1' },
  { name: 'server', type: 'regular', id: '60df19f0cd329a203f14dcc0' },
  { name: 'battery', type: 'regular', id: '60df19f0cd329a203f14dcbf' },
  {
    name: 'calendar-alt',
    type: 'regular',
    id: '60df19f0cd329a203f14dcbe'
  },
  { name: 'import', type: 'regular', id: '60df19f0cd329a203f14dcbd' },
  { name: 'ruler', type: 'regular', id: '60df19f0cd329a203f14dcbc' },
  {
    name: 'horizontal-center',
    type: 'regular',
    id: '60df19f0cd329a203f14dcbb'
  },
  {
    name: 'rotate-right',
    type: 'regular',
    id: '60df19f0cd329a203f14dcba'
  },
  { name: 'rename', type: 'regular', id: '60df19f0cd329a203f14dcb9' },
  { name: 'collapse', type: 'regular', id: '60df19f0cd329a203f14dcb8' },
  {
    name: 'phone-incoming',
    type: 'regular',
    id: '60df19f0cd329a203f14dcb7'
  },
  {
    name: 'phone-outgoing',
    type: 'regular',
    id: '60df19f0cd329a203f14dcb6'
  },
  { name: 'body', type: 'regular', id: '60df19f0cd329a203f14dcb5' },
  { name: 'cast', type: 'regular', id: '60df19f0cd329a203f14dcb4' },
  { name: 'chip', type: 'regular', id: '60df19f0cd329a203f14dcb3' },
  {
    name: 'skip-next-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14dcb2'
  },
  {
    name: 'skip-previous-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14dcb1'
  },
  { name: 'hdd', type: 'regular', id: '60df19f0cd329a203f14dcb0' },
  { name: 'store', type: 'regular', id: '60df19f0cd329a203f14dcaf' },
  { name: 'globe-alt', type: 'regular', id: '60df19f0cd329a203f14dcae' },
  { name: 'vimeo', type: 'logo', id: '60df19f0cd329a203f14dcad' },
  { name: 'upvote', type: 'regular', id: '60df19f0cd329a203f14dcac' },
  { name: 'downvote', type: 'regular', id: '60df19f0cd329a203f14dcab' },
  { name: 'news', type: 'regular', id: '60df19f0cd329a203f14dcaa' },
  {
    name: 'pie-chart-alt',
    type: 'regular',
    id: '60df19f0cd329a203f14dca9'
  },
  { name: 'images', type: 'regular', id: '60df19f0cd329a203f14dca8' },
  {
    name: 'purchase-tag',
    type: 'regular',
    id: '60df19f0cd329a203f14dca7'
  },
  { name: 'pen', type: 'regular', id: '60df19f0cd329a203f14dca6' },
  { name: 'expand', type: 'regular', id: '60df19f0cd329a203f14dca5' },
  { name: 'paperclip', type: 'regular', id: '60df19f0cd329a203f14dca4' },
  { name: 'closet', type: 'regular', id: '60df19f0cd329a203f14dca3' },
  { name: 'tv', type: 'regular', id: '60df19f0cd329a203f14dca2' },
  { name: 'collection', type: 'regular', id: '60df19f0cd329a203f14dca1' },
  { name: 'station', type: 'regular', id: '60df19f0cd329a203f14dca0' },
  { name: 'wallet', type: 'regular', id: '60df19f0cd329a203f14dc9f' },
  {
    name: 'briefcase-alt',
    type: 'regular',
    id: '60df19f0cd329a203f14dc9e'
  },
  { name: 'hourglass', type: 'regular', id: '60df19f0cd329a203f14dc9d' },
  { name: 'carousel', type: 'regular', id: '60df19f0cd329a203f14dc9c' },
  { name: 'infinite', type: 'regular', id: '60df19f0cd329a203f14dc9b' },
  { name: 'plug', type: 'regular', id: '60df19f0cd329a203f14dc9a' },
  {
    name: 'notification-off',
    type: 'regular',
    id: '60df19f0cd329a203f14dc99'
  },
  {
    name: 'window-close',
    type: 'regular',
    id: '60df19f0cd329a203f14dc98'
  },
  { name: 'command', type: 'regular', id: '60df19f0cd329a203f14dc97' },
  { name: 'grid-alt', type: 'regular', id: '60df19f0cd329a203f14dc96' },
  { name: 'trash-alt', type: 'regular', id: '60df19f0cd329a203f14dc95' },
  { name: 'chalkboard', type: 'regular', id: '60df19f0cd329a203f14dc94' },
  { name: 'loader', type: 'regular', id: '60df19f0cd329a203f14dc93' },
  { name: 'slider', type: 'regular', id: '60df19f0cd329a203f14dc92' },
  {
    name: 'paper-plane',
    type: 'regular',
    id: '60df19f0cd329a203f14dc91'
  },
  { name: 'selection', type: 'regular', id: '60df19f0cd329a203f14dc90' },
  { name: 'linkedin', type: 'logo', id: '60df19f0cd329a203f14dc8f' },
  { name: 'world', type: 'regular', id: '60df19f0cd329a203f14dc8e' },
  {
    name: 'dock-bottom',
    type: 'regular',
    id: '60df19f0cd329a203f14dc8d'
  },
  { name: 'dock-right', type: 'regular', id: '60df19f0cd329a203f14dc8c' },
  { name: 'dock-top', type: 'regular', id: '60df19f0cd329a203f14dc8b' },
  { name: 'dock-left', type: 'regular', id: '60df19f0cd329a203f14dc8a' },
  { name: 'layout', type: 'regular', id: '60df19f0cd329a203f14dc89' },
  { name: 'bitcoin', type: 'logo', id: '60df19f0cd329a203f14dc88' },
  {
    name: 'facebook-square',
    type: 'logo',
    id: '60df19f0cd329a203f14dc87'
  },
  { name: 'alarm-off', type: 'regular', id: '60df19f0cd329a203f14dc86' },
  { name: 'wrench', type: 'regular', id: '60df19f0cd329a203f14dc85' },
  {
    name: 'loader-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14dc84'
  },
  { name: 'loader-alt', type: 'regular', id: '60df19f0cd329a203f14dc83' },
  { name: 'car', type: 'regular', id: '60df19f0cd329a203f14dc82' },
  { name: 'cart-alt', type: 'regular', id: '60df19f0cd329a203f14dc81' },
  { name: 'adjust', type: 'solid', id: '60df19f0cd329a203f14dc80' },
  { name: 'alarm', type: 'solid', id: '60df19f0cd329a203f14dc7f' },
  { name: 'alarm-off', type: 'solid', id: '60df19f0cd329a203f14dc7e' },
  { name: 'album', type: 'solid', id: '60df19f0cd329a203f14dc7d' },
  { name: 'archive', type: 'solid', id: '60df19f0cd329a203f14dc7c' },
  { name: 'camera', type: 'solid', id: '60df19f0cd329a203f14dc7b' },
  { name: 'camera-off', type: 'solid', id: '60df19f0cd329a203f14dc7a' },
  { name: 'folder', type: 'solid', id: '60df19f0cd329a203f14dc79' },
  { name: 'folder-plus', type: 'solid', id: '60df19f0cd329a203f14dc78' },
  { name: 'award', type: 'solid', id: '60df19f0cd329a203f14dc77' },
  {
    name: 'bar-chart-square',
    type: 'solid',
    id: '60df19f0cd329a203f14dc76'
  },
  { name: 'barcode', type: 'solid', id: '60df19f0cd329a203f14dc75' },
  { name: 'battery', type: 'solid', id: '60df19f0cd329a203f14dc74' },
  {
    name: 'battery-charging',
    type: 'solid',
    id: '60df19f0cd329a203f14dc73'
  },
  { name: 'battery-full', type: 'solid', id: '60df19f0cd329a203f14dc72' },
  { name: 'bell', type: 'solid', id: '60df19f0cd329a203f14dc71' },
  { name: 'bell-off', type: 'solid', id: '60df19f0cd329a203f14dc70' },
  { name: 'bolt', type: 'solid', id: '60df19f0cd329a203f14dc6f' },
  { name: 'book', type: 'solid', id: '60df19f0cd329a203f14dc6e' },
  {
    name: 'book-bookmark',
    type: 'solid',
    id: '60df19f0cd329a203f14dc6d'
  },
  { name: 'bookmark', type: 'solid', id: '60df19f0cd329a203f14dc6c' },
  {
    name: 'bookmark-plus',
    type: 'solid',
    id: '60df19f0cd329a203f14dc6b'
  },
  { name: 'book-open', type: 'solid', id: '60df19f0cd329a203f14dc6a' },
  {
    name: 'bookmark-star',
    type: 'solid',
    id: '60df19f0cd329a203f14dc69'
  },
  { name: 'briefcase', type: 'solid', id: '60df19f0cd329a203f14dc68' },
  {
    name: 'briefcase-alt',
    type: 'solid',
    id: '60df19f0cd329a203f14dc67'
  },
  { name: 'bug', type: 'solid', id: '60df19f0cd329a203f14dc66' },
  { name: 'building', type: 'solid', id: '60df19f0cd329a203f14dc65' },
  { name: 'bulb', type: 'solid', id: '60df19f0cd329a203f14dc64' },
  { name: 'buoy', type: 'solid', id: '60df19f0cd329a203f14dc63' },
  { name: 'calculator', type: 'solid', id: '60df19f0cd329a203f14dc62' },
  { name: 'captions', type: 'solid', id: '60df19f0cd329a203f14dc61' },
  { name: 'car', type: 'solid', id: '60df19f0cd329a203f14dc60' },
  { name: 'cart-alt', type: 'solid', id: '60df19f0cd329a203f14dc5f' },
  { name: 'cart', type: 'solid', id: '60df19f0cd329a203f14dc5e' },
  { name: 'chart', type: 'solid', id: '60df19f0cd329a203f14dc5d' },
  { name: 'chip', type: 'solid', id: '60df19f0cd329a203f14dc5c' },
  {
    name: 'cloud-download',
    type: 'solid',
    id: '60df19f0cd329a203f14dc5b'
  },
  { name: 'cloud-upload', type: 'solid', id: '60df19f0cd329a203f14dc5a' },
  { name: 'cloud', type: 'solid', id: '60df19f0cd329a203f14dc59' },
  { name: 'coffee', type: 'solid', id: '60df19f0cd329a203f14dc58' },
  { name: 'cog', type: 'solid', id: '60df19f0cd329a203f14dc57' },
  { name: 'collection', type: 'solid', id: '60df19f0cd329a203f14dc56' },
  { name: 'contact', type: 'solid', id: '60df19f0cd329a203f14dc55' },
  { name: 'copy', type: 'solid', id: '60df19f0cd329a203f14dc54' },
  { name: 'coupon', type: 'solid', id: '60df19f0cd329a203f14dc53' },
  { name: 'crown', type: 'solid', id: '60df19f0cd329a203f14dc52' },
  { name: 'cube', type: 'solid', id: '60df19f0cd329a203f14dc51' },
  { name: 'detail', type: 'solid', id: '60df19f0cd329a203f14dc50' },
  { name: 'discount', type: 'solid', id: '60df19f0cd329a203f14dc4f' },
  { name: 'dislike', type: 'solid', id: '60df19f0cd329a203f14dc4e' },
  { name: 'dock-bottom', type: 'solid', id: '60df19f0cd329a203f14dc4d' },
  { name: 'dock-left', type: 'solid', id: '60df19f0cd329a203f14dc4c' },
  { name: 'dock-right', type: 'solid', id: '60df19f0cd329a203f14dc4b' },
  { name: 'dock-top', type: 'solid', id: '60df19f0cd329a203f14dc4a' },
  {
    name: 'down-arrow-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14dc49'
  },
  { name: 'download', type: 'solid', id: '60df19f0cd329a203f14dc48' },
  { name: 'downvote', type: 'solid', id: '60df19f0cd329a203f14dc47' },
  { name: 'drink', type: 'solid', id: '60df19f0cd329a203f14dc46' },
  { name: 'droplet', type: 'solid', id: '60df19f0cd329a203f14dc45' },
  { name: 'duplicate', type: 'solid', id: '60df19f0cd329a203f14dc44' },
  { name: 'eject', type: 'solid', id: '60df19f0cd329a203f14dc43' },
  { name: 'envelope', type: 'solid', id: '60df19f0cd329a203f14dc42' },
  { name: 'error-circle', type: 'solid', id: '60df19f0cd329a203f14dc41' },
  { name: 'error', type: 'solid', id: '60df19f0cd329a203f14dc40' },
  { name: 'file-image', type: 'solid', id: '60df19f0cd329a203f14dc3f' },
  { name: 'file', type: 'solid', id: '60df19f0cd329a203f14dc3e' },
  { name: 'filter-alt', type: 'solid', id: '60df19f0cd329a203f14dc3d' },
  { name: 'first-aid', type: 'solid', id: '60df19f0cd329a203f14dc3c' },
  { name: 'flag-alt', type: 'solid', id: '60df19f0cd329a203f14dc3b' },
  { name: 'flag', type: 'solid', id: '60df19f0cd329a203f14dc3a' },
  { name: 'gift', type: 'solid', id: '60df19f0cd329a203f14dc39' },
  { name: 'grid-alt', type: 'solid', id: '60df19f0cd329a203f14dc38' },
  { name: 'group', type: 'solid', id: '60df19f0cd329a203f14dc37' },
  { name: 'hdd', type: 'solid', id: '60df19f0cd329a203f14dc36' },
  { name: 'heart', type: 'solid', id: '60df19f0cd329a203f14dc35' },
  { name: 'hide', type: 'solid', id: '60df19f0cd329a203f14dc34' },
  { name: 'home', type: 'solid', id: '60df19f0cd329a203f14dc33' },
  { name: 'hot', type: 'solid', id: '60df19f0cd329a203f14dc32' },
  { name: 'hourglass', type: 'solid', id: '60df19f0cd329a203f14dc31' },
  { name: 'image', type: 'solid', id: '60df19f0cd329a203f14dc30' },
  { name: 'inbox', type: 'solid', id: '60df19f0cd329a203f14dc2f' },
  { name: 'info-circle', type: 'solid', id: '60df19f0cd329a203f14dc2e' },
  { name: 'joystick-alt', type: 'solid', id: '60df19f0cd329a203f14dc2d' },
  { name: 'joystick', type: 'solid', id: '60df19f0cd329a203f14dc2c' },
  { name: 'layer', type: 'solid', id: '60df19f0cd329a203f14dc2b' },
  {
    name: 'left-arrow-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14dc2a'
  },
  { name: 'like', type: 'solid', id: '60df19f0cd329a203f14dc29' },
  { name: 'lock-open', type: 'solid', id: '60df19f0cd329a203f14dc28' },
  { name: 'lock', type: 'solid', id: '60df19f0cd329a203f14dc27' },
  { name: 'map-alt', type: 'solid', id: '60df19f0cd329a203f14dc26' },
  { name: 'map', type: 'solid', id: '60df19f0cd329a203f14dc25' },
  {
    name: 'message-rounded',
    type: 'solid',
    id: '60df19f0cd329a203f14dc24'
  },
  { name: 'message', type: 'solid', id: '60df19f0cd329a203f14dc23' },
  {
    name: 'microphone-off',
    type: 'solid',
    id: '60df19f0cd329a203f14dc22'
  },
  { name: 'microphone', type: 'solid', id: '60df19f0cd329a203f14dc21' },
  { name: 'minus-circle', type: 'solid', id: '60df19f0cd329a203f14dc20' },
  { name: 'moon', type: 'solid', id: '60df19f0cd329a203f14dc1f' },
  { name: 'mouse', type: 'solid', id: '60df19f0cd329a203f14dc1e' },
  { name: 'music', type: 'solid', id: '60df19f0cd329a203f14dc1d' },
  { name: 'navigation', type: 'solid', id: '60df19f0cd329a203f14dc1c' },
  { name: 'news', type: 'solid', id: '60df19f0cd329a203f14dc1b' },
  { name: 'package', type: 'solid', id: '60df19f0cd329a203f14dc1a' },
  { name: 'paper-plane', type: 'solid', id: '60df19f0cd329a203f14dc19' },
  { name: 'paste', type: 'solid', id: '60df19f0cd329a203f14dc18' },
  { name: 'pen', type: 'solid', id: '60df19f0cd329a203f14dc17' },
  { name: 'pencil', type: 'solid', id: '60df19f0cd329a203f14dc16' },
  { name: 'phone-call', type: 'solid', id: '60df19f0cd329a203f14dc15' },
  {
    name: 'phone-incoming',
    type: 'solid',
    id: '60df19f0cd329a203f14dc14'
  },
  {
    name: 'phone-outgoing',
    type: 'solid',
    id: '60df19f0cd329a203f14dc13'
  },
  { name: 'phone', type: 'solid', id: '60df19f0cd329a203f14dc12' },
  {
    name: 'pie-chart-alt',
    type: 'solid',
    id: '60df19f0cd329a203f14dc11'
  },
  { name: 'pie-chart', type: 'solid', id: '60df19f0cd329a203f14dc10' },
  { name: 'pin', type: 'solid', id: '60df19f0cd329a203f14dc0f' },
  { name: 'playlist', type: 'solid', id: '60df19f0cd329a203f14dc0e' },
  { name: 'plug', type: 'solid', id: '60df19f0cd329a203f14dc0d' },
  { name: 'plus-circle', type: 'solid', id: '60df19f0cd329a203f14dc0c' },
  { name: 'printer', type: 'solid', id: '60df19f0cd329a203f14dc0b' },
  { name: 'purchase-tag', type: 'solid', id: '60df19f0cd329a203f14dc0a' },
  { name: 'quote-left', type: 'solid', id: '60df19f0cd329a203f14dc09' },
  { name: 'quote-right', type: 'solid', id: '60df19f0cd329a203f14dc08' },
  { name: 'radio', type: 'solid', id: '60df19f0cd329a203f14dc07' },
  { name: 'rename', type: 'solid', id: '60df19f0cd329a203f14dc06' },
  { name: 'report', type: 'solid', id: '60df19f0cd329a203f14dc05' },
  {
    name: 'right-arrow-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14dc04'
  },
  { name: 'ruler', type: 'solid', id: '60df19f0cd329a203f14dc03' },
  { name: 'save', type: 'solid', id: '60df19f0cd329a203f14dc02' },
  { name: 'sort-alt', type: 'solid', id: '60df19f0cd329a203f14dc01' },
  {
    name: 'select-multiple',
    type: 'solid',
    id: '60df19f0cd329a203f14dc00'
  },
  { name: 'send', type: 'solid', id: '60df19f0cd329a203f14dbff' },
  { name: 'server', type: 'solid', id: '60df19f0cd329a203f14dbfe' },
  { name: 'share-alt', type: 'solid', id: '60df19f0cd329a203f14dbfd' },
  { name: 'share', type: 'solid', id: '60df19f0cd329a203f14dbfc' },
  { name: 'shield', type: 'solid', id: '60df19f0cd329a203f14dbfb' },
  {
    name: 'shopping-bag-alt',
    type: 'solid',
    id: '60df19f0cd329a203f14dbfa'
  },
  { name: 'shopping-bag', type: 'solid', id: '60df19f0cd329a203f14dbf9' },
  { name: 'show', type: 'solid', id: '60df19f0cd329a203f14dbf8' },
  { name: 'happy', type: 'regular', id: '60df19f0cd329a203f14dbf7' },
  { name: 'meh', type: 'regular', id: '60df19f0cd329a203f14dbf6' },
  { name: 'sad', type: 'regular', id: '60df19f0cd329a203f14dbf5' },
  { name: 'spreadsheet', type: 'solid', id: '60df19f0cd329a203f14dbf4' },
  { name: 'star', type: 'solid', id: '60df19f0cd329a203f14dbf3' },
  { name: 'store', type: 'solid', id: '60df19f0cd329a203f14dbf2' },
  { name: 'sun', type: 'solid', id: '60df19f0cd329a203f14dbf1' },
  { name: 't-shirt', type: 'solid', id: '60df19f0cd329a203f14dbf0' },
  { name: 'tag-x', type: 'solid', id: '60df19f0cd329a203f14dbef' },
  { name: 'tag', type: 'solid', id: '60df19f0cd329a203f14dbee' },
  { name: 'tennis-ball', type: 'solid', id: '60df19f0cd329a203f14dbed' },
  { name: 'terminal', type: 'solid', id: '60df19f0cd329a203f14dbec' },
  { name: 'to-top', type: 'solid', id: '60df19f0cd329a203f14dbeb' },
  { name: 'toggle-left', type: 'solid', id: '60df19f0cd329a203f14dbea' },
  { name: 'toggle-right', type: 'solid', id: '60df19f0cd329a203f14dbe9' },
  { name: 'torch', type: 'solid', id: '60df19f0cd329a203f14dbe8' },
  { name: 'trash-alt', type: 'solid', id: '60df19f0cd329a203f14dbe7' },
  { name: 'trash', type: 'solid', id: '60df19f0cd329a203f14dbe6' },
  { name: 'trophy', type: 'solid', id: '60df19f0cd329a203f14dbe5' },
  { name: 'truck', type: 'solid', id: '60df19f0cd329a203f14dbe4' },
  {
    name: 'up-arrow-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14dbe3'
  },
  { name: 'upvote', type: 'solid', id: '60df19f0cd329a203f14dbe2' },
  { name: 'user-circle', type: 'solid', id: '60df19f0cd329a203f14dbe1' },
  { name: 'user-detail', type: 'solid', id: '60df19f0cd329a203f14dbe0' },
  { name: 'user-minus', type: 'solid', id: '60df19f0cd329a203f14dbdf' },
  { name: 'user-plus', type: 'solid', id: '60df19f0cd329a203f14dbde' },
  { name: 'user', type: 'solid', id: '60df19f0cd329a203f14dbdd' },
  { name: 'video-off', type: 'solid', id: '60df19f0cd329a203f14dbdc' },
  { name: 'video', type: 'solid', id: '60df19f0cd329a203f14dbdb' },
  { name: 'videos', type: 'solid', id: '60df19f0cd329a203f14dbda' },
  { name: 'volume-full', type: 'solid', id: '60df19f0cd329a203f14dbd9' },
  { name: 'volume-low', type: 'solid', id: '60df19f0cd329a203f14dbd8' },
  { name: 'volume-mute', type: 'solid', id: '60df19f0cd329a203f14dbd7' },
  { name: 'volume', type: 'solid', id: '60df19f0cd329a203f14dbd6' },
  { name: 'wallet', type: 'solid', id: '60df19f0cd329a203f14dbd5' },
  { name: 'watch-alt', type: 'solid', id: '60df19f0cd329a203f14dbd4' },
  { name: 'watch', type: 'solid', id: '60df19f0cd329a203f14dbd3' },
  { name: 'widget', type: 'solid', id: '60df19f0cd329a203f14dbd2' },
  { name: 'wrench', type: 'solid', id: '60df19f0cd329a203f14dbd1' },
  { name: 'x-circle', type: 'solid', id: '60df19f0cd329a203f14dbd0' },
  { name: 'zap', type: 'solid', id: '60df19f0cd329a203f14dbcf' },
  { name: 'folder-open', type: 'solid', id: '60df19f0cd329a203f14dbce' },
  { name: 'battery-low', type: 'solid', id: '60df19f0cd329a203f14dbcd' },
  { name: 'conversation', type: 'solid', id: '60df19f0cd329a203f14dbcc' },
  { name: 'dashboard', type: 'solid', id: '60df19f0cd329a203f14dbcb' },
  { name: 'file-plus', type: 'solid', id: '60df19f0cd329a203f14dbca' },
  { name: 'slider-alt', type: 'regular', id: '60df19f0cd329a203f14dbc9' },
  { name: 'google-plus', type: 'logo', id: '60df19f0cd329a203f14dbc8' },
  {
    name: 'google-plus-circle',
    type: 'logo',
    id: '60df19f0cd329a203f14dbc7'
  },
  {
    name: 'linkedin-square',
    type: 'logo',
    id: '60df19f0cd329a203f14dbc6'
  },
  { name: 'medium', type: 'logo', id: '60df19f0cd329a203f14dbc5' },
  { name: 'medium-square', type: 'logo', id: '60df19f0cd329a203f14dbc4' },
  { name: 'skype', type: 'logo', id: '60df19f0cd329a203f14dbc3' },
  { name: 'slack-old', type: 'logo', id: '60df19f0cd329a203f14dbc2' },
  { name: 'slack', type: 'logo', id: '60df19f0cd329a203f14dbc1' },
  { name: 'twitch', type: 'logo', id: '60df19f0cd329a203f14dbc0' },
  { name: 'discord', type: 'logo', id: '60df19f0cd329a203f14dbbf' },
  { name: 'reddit', type: 'logo', id: '60df19f0cd329a203f14dbbe' },
  { name: 'pinterest', type: 'logo', id: '60df19f0cd329a203f14dbbd' },
  { name: 'blogger', type: 'logo', id: '60df19f0cd329a203f14dbbc' },
  {
    name: 'certification',
    type: 'regular',
    id: '60df19f0cd329a203f14dbbb'
  },
  {
    name: 'certification',
    type: 'solid',
    id: '60df19f0cd329a203f14dbba'
  },
  { name: 'rocket', type: 'regular', id: '60df19f0cd329a203f14dbb9' },
  { name: 'rocket', type: 'solid', id: '60df19f0cd329a203f14dbb8' },
  {
    name: 'check-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14dbb7'
  },
  { name: 'check-circle', type: 'solid', id: '60df19f0cd329a203f14dbb6' },
  { name: 'checkbox', type: 'solid', id: '60df19f0cd329a203f14dbb5' },
  {
    name: 'checkbox-checked',
    type: 'solid',
    id: '60df19f0cd329a203f14dbb4'
  },
  { name: 'star-half', type: 'solid', id: '60df19f0cd329a203f14dbb3' },
  { name: 'bus', type: 'regular', id: '60df19f0cd329a203f14dbb2' },
  { name: 'bus', type: 'solid', id: '60df19f0cd329a203f14dbb1' },
  {
    name: 'check-double',
    type: 'regular',
    id: '60df19f0cd329a203f14dbb0'
  },
  { name: 'dumbbell', type: 'regular', id: '60df19f0cd329a203f14dbaf' },
  { name: 'bot', type: 'regular', id: '60df19f0cd329a203f14dbae' },
  { name: 'area', type: 'regular', id: '60df19f0cd329a203f14dbad' },
  { name: 'bot', type: 'solid', id: '60df19f0cd329a203f14dbac' },
  { name: 'area', type: 'solid', id: '60df19f0cd329a203f14dbab' },
  { name: 'bed', type: 'regular', id: '60df19f0cd329a203f14dbaa' },
  { name: 'bed', type: 'solid', id: '60df19f0cd329a203f14dba9' },
  { name: 'bath', type: 'regular', id: '60df19f0cd329a203f14dba8' },
  { name: 'bath', type: 'solid', id: '60df19f0cd329a203f14dba7' },
  { name: 'train', type: 'regular', id: '60df19f0cd329a203f14dba6' },
  { name: 'train', type: 'solid', id: '60df19f0cd329a203f14dba5' },
  { name: 'taxi', type: 'regular', id: '60df19f0cd329a203f14dba4' },
  { name: 'taxi', type: 'solid', id: '60df19f0cd329a203f14dba3' },
  { name: 'movie', type: 'regular', id: '60df19f0cd329a203f14dba2' },
  { name: 'movie', type: 'solid', id: '60df19f0cd329a203f14dba1' },
  { name: 'hotel', type: 'regular', id: '60df19f0cd329a203f14dba0' },
  { name: 'planet', type: 'regular', id: '60df19f0cd329a203f14db9f' },
  { name: 'planet', type: 'solid', id: '60df19f0cd329a203f14db9e' },
  { name: 'list-ol', type: 'regular', id: '60df19f0cd329a203f14db9d' },
  { name: 'video-plus', type: 'regular', id: '60df19f0cd329a203f14db9c' },
  { name: 'video-plus', type: 'solid', id: '60df19f0cd329a203f14db9b' },
  {
    name: 'menu-alt-left',
    type: 'regular',
    id: '60df19f0cd329a203f14db9a'
  },
  {
    name: 'menu-alt-right',
    type: 'regular',
    id: '60df19f0cd329a203f14db99'
  },
  { name: 'box', type: 'regular', id: '60df19f0cd329a203f14db98' },
  { name: 'box', type: 'solid', id: '60df19f0cd329a203f14db97' },
  { name: 'key', type: 'solid', id: '60df19f0cd329a203f14db96' },
  { name: 'restaurant', type: 'regular', id: '60df19f0cd329a203f14db95' },
  { name: 'swim', type: 'regular', id: '60df19f0cd329a203f14db94' },
  { name: 'water', type: 'regular', id: '60df19f0cd329a203f14db93' },
  { name: 'wind', type: 'regular', id: '60df19f0cd329a203f14db92' },
  { name: 'dialpad', type: 'regular', id: '60df19f0cd329a203f14db91' },
  { name: 'handicap', type: 'regular', id: '60df19f0cd329a203f14db90' },
  { name: 'font-size', type: 'regular', id: '60df19f0cd329a203f14db8f' },
  { name: 'code-block', type: 'regular', id: '60df19f0cd329a203f14db8e' },
  {
    name: 'photo-album',
    type: 'regular',
    id: '60df19f0cd329a203f14db8d'
  },
  { name: 'photo-album', type: 'solid', id: '60df19f0cd329a203f14db8c' },
  { name: 'bell-ring', type: 'solid', id: '60df19f0cd329a203f14db8b' },
  { name: 'apple', type: 'logo', id: '60df19f0cd329a203f14db8a' },
  { name: 'android', type: 'logo', id: '60df19f0cd329a203f14db89' },
  { name: 'play-store', type: 'logo', id: '60df19f0cd329a203f14db88' },
  { name: 'windows', type: 'logo', id: '60df19f0cd329a203f14db87' },
  { name: 'vk', type: 'logo', id: '60df19f0cd329a203f14db86' },
  { name: 'pocket', type: 'logo', id: '60df19f0cd329a203f14db85' },
  {
    name: 'strikethrough',
    type: 'regular',
    id: '60df19f0cd329a203f14db84'
  },
  { name: 'file-blank', type: 'regular', id: '60df19f0cd329a203f14db83' },
  { name: 'file-blank', type: 'solid', id: '60df19f0cd329a203f14db82' },
  { name: 'highlight', type: 'regular', id: '60df19f0cd329a203f14db81' },
  { name: 'font-color', type: 'regular', id: '60df19f0cd329a203f14db80' },
  {
    name: 'fingerprint',
    type: 'regular',
    id: '60df19f0cd329a203f14db7f'
  },
  { name: 'transfer', type: 'regular', id: '60df19f0cd329a203f14db7e' },
  { name: 'circle', type: 'regular', id: '60df19f0cd329a203f14db7d' },
  { name: 'edit', type: 'solid', id: '60df19f0cd329a203f14db7c' },
  { name: 'ball', type: 'regular', id: '60df19f0cd329a203f14db7b' },
  { name: 'ball', type: 'solid', id: '60df19f0cd329a203f14db7a' },
  { name: 'football', type: 'regular', id: '60df19f0cd329a203f14db79' },
  { name: 'film', type: 'solid', id: '60df19f0cd329a203f14db78' },
  {
    name: 'dollar-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14db77'
  },
  {
    name: 'dollar-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14db76'
  },
  { name: 'skull', type: 'solid', id: '60df19f0cd329a203f14db75' },
  { name: 'messenger', type: 'logo', id: '60df19f0cd329a203f14db74' },
  { name: 'search-alt', type: 'regular', id: '60df19f0cd329a203f14db73' },
  { name: 'image-alt', type: 'solid', id: '60df19f0cd329a203f14db72' },
  {
    name: 'microphone-alt',
    type: 'solid',
    id: '60df19f0cd329a203f14db71'
  },
  { name: 'analyse', type: 'regular', id: '60df19f0cd329a203f14db70' },
  { name: 'x-square', type: 'solid', id: '60df19f0cd329a203f14db6f' },
  { name: 'plus-square', type: 'solid', id: '60df19f0cd329a203f14db6e' },
  { name: 'minus-square', type: 'solid', id: '60df19f0cd329a203f14db6d' },
  { name: 'disc', type: 'regular', id: '60df19f0cd329a203f14db6c' },
  { name: 'disc', type: 'solid', id: '60df19f0cd329a203f14db6b' },
  { name: 'equalizer', type: 'regular', id: '60df19f0cd329a203f14db6a' },
  { name: 'stats', type: 'regular', id: '60df19f0cd329a203f14db69' },
  {
    name: 'move-horizontal',
    type: 'regular',
    id: '60df19f0cd329a203f14db68'
  },
  {
    name: 'move-vertical',
    type: 'regular',
    id: '60df19f0cd329a203f14db67'
  },
  { name: 'flame', type: 'solid', id: '60df19f0cd329a203f14db66' },
  {
    name: 'grid-horizontal',
    type: 'regular',
    id: '60df19f0cd329a203f14db65'
  },
  {
    name: 'grid-vertical',
    type: 'regular',
    id: '60df19f0cd329a203f14db64'
  },
  { name: 'grid-small', type: 'regular', id: '60df19f0cd329a203f14db63' },
  { name: 'badge', type: 'regular', id: '60df19f0cd329a203f14db62' },
  { name: 'badge', type: 'solid', id: '60df19f0cd329a203f14db61' },
  { name: 'id-card', type: 'regular', id: '60df19f0cd329a203f14db60' },
  { name: 'sort-up', type: 'regular', id: '60df19f0cd329a203f14db5f' },
  { name: 'sort-down', type: 'regular', id: '60df19f0cd329a203f14db5e' },
  { name: 'note', type: 'regular', id: '60df19f0cd329a203f14db5d' },
  { name: 'note', type: 'solid', id: '60df19f0cd329a203f14db5c' },
  { name: 'test-tube', type: 'regular', id: '60df19f0cd329a203f14db5b' },
  {
    name: 'help-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14db5a'
  },
  { name: 'help-circle', type: 'solid', id: '60df19f0cd329a203f14db59' },
  { name: 'card', type: 'regular', id: '60df19f0cd329a203f14db58' },
  { name: 'card', type: 'solid', id: '60df19f0cd329a203f14db57' },
  {
    name: 'rewind-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14db56'
  },
  { name: 'magnet', type: 'regular', id: '60df19f0cd329a203f14db55' },
  { name: 'magnet', type: 'solid', id: '60df19f0cd329a203f14db54' },
  { name: '500px', type: 'logo', id: '60df19f0cd329a203f14db53' },
  { name: 'angular', type: 'logo', id: '60df19f0cd329a203f14db52' },
  { name: 'codepen', type: 'logo', id: '60df19f0cd329a203f14db51' },
  {
    name: 'creative-commons',
    type: 'logo',
    id: '60df19f0cd329a203f14db50'
  },
  { name: 'digitalocean', type: 'logo', id: '60df19f0cd329a203f14db4f' },
  { name: 'deviantart', type: 'logo', id: '60df19f0cd329a203f14db4e' },
  { name: 'discourse', type: 'logo', id: '60df19f0cd329a203f14db4d' },
  { name: 'dropbox', type: 'logo', id: '60df19f0cd329a203f14db4c' },
  { name: 'drupal', type: 'logo', id: '60df19f0cd329a203f14db4b' },
  { name: 'ebay', type: 'logo', id: '60df19f0cd329a203f14db4a' },
  { name: 'amazon', type: 'logo', id: '60df19f0cd329a203f14db49' },
  { name: 'digg', type: 'logo', id: '60df19f0cd329a203f14db48' },
  { name: 'unsplash', type: 'logo', id: '60df19f0cd329a203f14db47' },
  { name: 'wikipedia', type: 'logo', id: '60df19f0cd329a203f14db46' },
  { name: 'sass', type: 'logo', id: '60df19f0cd329a203f14db45' },
  { name: 'foursquare', type: 'logo', id: '60df19f0cd329a203f14db44' },
  { name: 'invision', type: 'logo', id: '60df19f0cd329a203f14db43' },
  { name: 'opera', type: 'logo', id: '60df19f0cd329a203f14db42' },
  { name: 'airbnb', type: 'logo', id: '60df19f0cd329a203f14db41' },
  { name: 'yelp', type: 'logo', id: '60df19f0cd329a203f14db40' },
  { name: 'quora', type: 'logo', id: '60df19f0cd329a203f14db3f' },
  { name: 'git', type: 'logo', id: '60df19f0cd329a203f14db3e' },
  { name: 'html5', type: 'logo', id: '60df19f0cd329a203f14db3d' },
  { name: 'product-hunt', type: 'logo', id: '60df19f0cd329a203f14db3c' },
  { name: 'magento', type: 'logo', id: '60df19f0cd329a203f14db3b' },
  {
    name: 'stack-overflow',
    type: 'logo',
    id: '60df19f0cd329a203f14db3a'
  },
  { name: 'firefox', type: 'logo', id: '60df19f0cd329a203f14db39' },
  { name: 'javascript', type: 'logo', id: '60df19f0cd329a203f14db38' },
  { name: 'nodejs', type: 'logo', id: '60df19f0cd329a203f14db37' },
  { name: 'kickstarter', type: 'logo', id: '60df19f0cd329a203f14db36' },
  { name: 'vuejs', type: 'logo', id: '60df19f0cd329a203f14db35' },
  { name: 'bing', type: 'logo', id: '60df19f0cd329a203f14db34' },
  { name: 'react', type: 'logo', id: '60df19f0cd329a203f14db33' },
  { name: 'periscope', type: 'logo', id: '60df19f0cd329a203f14db32' },
  { name: 'wordpress', type: 'logo', id: '60df19f0cd329a203f14db31' },
  { name: 'telegram', type: 'logo', id: '60df19f0cd329a203f14db30' },
  { name: 'stripe', type: 'logo', id: '60df19f0cd329a203f14db2f' },
  { name: 'edge', type: 'logo', id: '60df19f0cd329a203f14db2e' },
  { name: 'paypal', type: 'logo', id: '60df19f0cd329a203f14db2d' },
  {
    name: 'internet-explorer',
    type: 'logo',
    id: '60df19f0cd329a203f14db2c'
  },
  { name: 'joomla', type: 'logo', id: '60df19f0cd329a203f14db2b' },
  { name: 'dailymotion', type: 'logo', id: '60df19f0cd329a203f14db2a' },
  { name: 'chrome', type: 'logo', id: '60df19f0cd329a203f14db29' },
  { name: 'baidu', type: 'logo', id: '60df19f0cd329a203f14db28' },
  { name: 'visa', type: 'logo', id: '60df19f0cd329a203f14db27' },
  { name: 'mastercard', type: 'logo', id: '60df19f0cd329a203f14db26' },
  { name: 'redux', type: 'logo', id: '60df19f0cd329a203f14db25' },
  { name: 'bootstrap', type: 'logo', id: '60df19f0cd329a203f14db24' },
  { name: 'yahoo', type: 'logo', id: '60df19f0cd329a203f14db23' },
  { name: 'microsoft', type: 'logo', id: '60df19f0cd329a203f14db22' },
  { name: 'css3', type: 'logo', id: '60df19f0cd329a203f14db21' },
  { name: 'jsfiddle', type: 'logo', id: '60df19f0cd329a203f14db20' },
  { name: 'shopify', type: 'logo', id: '60df19f0cd329a203f14db1f' },
  { name: 'flickr', type: 'logo', id: '60df19f0cd329a203f14db1e' },
  { name: 'less', type: 'logo', id: '60df19f0cd329a203f14db1d' },
  { name: 'snapchat', type: 'logo', id: '60df19f0cd329a203f14db1c' },
  { name: 'soundcloud', type: 'logo', id: '60df19f0cd329a203f14db1b' },
  { name: 'spotify', type: 'logo', id: '60df19f0cd329a203f14db1a' },
  { name: 'trello', type: 'logo', id: '60df19f0cd329a203f14db19' },
  { name: 'wix', type: 'logo', id: '60df19f0cd329a203f14db18' },
  { name: 'mailchimp', type: 'logo', id: '60df19f0cd329a203f14db17' },
  { name: 'medium-old', type: 'logo', id: '60df19f0cd329a203f14db16' },
  { name: 'squarespace', type: 'logo', id: '60df19f0cd329a203f14db15' },
  {
    name: 'whatsapp-square',
    type: 'logo',
    id: '60df19f0cd329a203f14db14'
  },
  { name: 'flickr-square', type: 'logo', id: '60df19f0cd329a203f14db13' },
  { name: 'ambulance', type: 'solid', id: '60df19f0cd329a203f14db12' },
  {
    name: 'left-arrow-square',
    type: 'solid',
    id: '60df19f0cd329a203f14db11'
  },
  {
    name: 'up-arrow-square',
    type: 'solid',
    id: '60df19f0cd329a203f14db10'
  },
  {
    name: 'down-arrow-square',
    type: 'solid',
    id: '60df19f0cd329a203f14db0f'
  },
  {
    name: 'right-arrow-square',
    type: 'solid',
    id: '60df19f0cd329a203f14db0e'
  },
  { name: 'user-badge', type: 'solid', id: '60df19f0cd329a203f14db0d' },
  {
    name: 'calendar-event',
    type: 'regular',
    id: '60df19f0cd329a203f14db0c'
  },
  { name: 'caret-left', type: 'regular', id: '60df19f0cd329a203f14db0b' },
  { name: 'caret-up', type: 'regular', id: '60df19f0cd329a203f14db0a' },
  {
    name: 'caret-right',
    type: 'regular',
    id: '60df19f0cd329a203f14db09'
  },
  { name: 'caret-down', type: 'regular', id: '60df19f0cd329a203f14db08' },
  { name: 'gas-pump', type: 'solid', id: '60df19f0cd329a203f14db07' },
  { name: 'landmark', type: 'solid', id: '60df19f0cd329a203f14db06' },
  { name: 'show-alt', type: 'regular', id: '60df19f0cd329a203f14db05' },
  {
    name: 'badge-check',
    type: 'regular',
    id: '60df19f0cd329a203f14db04'
  },
  { name: 'badge-check', type: 'solid', id: '60df19f0cd329a203f14db03' },
  {
    name: 'rotate-left',
    type: 'regular',
    id: '60df19f0cd329a203f14db02'
  },
  { name: 'coffee-alt', type: 'solid', id: '60df19f0cd329a203f14db01' },
  { name: 'brush', type: 'regular', id: '60df19f0cd329a203f14db00' },
  { name: 'brush', type: 'solid', id: '60df19f0cd329a203f14daff' },
  { name: 'keyboard', type: 'solid', id: '60df19f0cd329a203f14dafe' },
  { name: 'megaphone', type: 'solid', id: '60df19f0cd329a203f14dafd' },
  { name: 'directions', type: 'solid', id: '60df19f0cd329a203f14dafc' },
  {
    name: 'direction-right',
    type: 'solid',
    id: '60df19f0cd329a203f14dafb'
  },
  { name: 'unlink', type: 'regular', id: '60df19f0cd329a203f14dafa' },
  { name: 'paint', type: 'regular', id: '60df19f0cd329a203f14daf9' },
  {
    name: 'joystick-button',
    type: 'regular',
    id: '60df19f0cd329a203f14daf8'
  },
  {
    name: 'joystick-button',
    type: 'solid',
    id: '60df19f0cd329a203f14daf7'
  },
  {
    name: 'font-family',
    type: 'regular',
    id: '60df19f0cd329a203f14daf6'
  },
  { name: 'flask', type: 'solid', id: '60df19f0cd329a203f14daf5' },
  { name: 'capsule', type: 'solid', id: '60df19f0cd329a203f14daf4' },
  { name: 'color-fill', type: 'solid', id: '60df19f0cd329a203f14daf3' },
  { name: 'hotel', type: 'solid', id: '60df19f0cd329a203f14daf2' },
  { name: 'magic-wand', type: 'solid', id: '60df19f0cd329a203f14daf1' },
  { name: 'repeat', type: 'regular', id: '60df19f0cd329a203f14daf0' },
  { name: 'eraser', type: 'solid', id: '60df19f0cd329a203f14daef' },
  { name: 'cloud-rain', type: 'solid', id: '60df19f0cd329a203f14daee' },
  {
    name: 'cloud-lightning',
    type: 'solid',
    id: '60df19f0cd329a203f14daed'
  },
  { name: 'eyedropper', type: 'solid', id: '60df19f0cd329a203f14daec' },
  {
    name: 'user-rectangle',
    type: 'solid',
    id: '60df19f0cd329a203f14daeb'
  },
  { name: 'plane', type: 'solid', id: '60df19f0cd329a203f14daea' },
  { name: 'tree', type: 'solid', id: '60df19f0cd329a203f14dae9' },
  { name: 'factory', type: 'solid', id: '60df19f0cd329a203f14dae8' },
  { name: 'ship', type: 'solid', id: '60df19f0cd329a203f14dae7' },
  { name: 'walk', type: 'regular', id: '60df19f0cd329a203f14dae6' },
  { name: 'yin-yang', type: 'solid', id: '60df19f0cd329a203f14dae5' },
  { name: 'file-pdf', type: 'solid', id: '60df19f0cd329a203f14dae4' },
  { name: 'money', type: 'regular', id: '60df19f0cd329a203f14dae3' },
  {
    name: 'home-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14dae2'
  },
  { name: 'home-circle', type: 'solid', id: '60df19f0cd329a203f14dae1' },
  {
    name: 'location-plus',
    type: 'regular',
    id: '60df19f0cd329a203f14dae0'
  },
  {
    name: 'location-plus',
    type: 'solid',
    id: '60df19f0cd329a203f14dadf'
  },
  { name: 'arch', type: 'regular', id: '60df19f0cd329a203f14dade' },
  { name: 'arch', type: 'solid', id: '60df19f0cd329a203f14dadd' },
  { name: 'atom', type: 'regular', id: '60df19f0cd329a203f14dadc' },
  { name: 'badge-dollar', type: 'solid', id: '60df19f0cd329a203f14dadb' },
  { name: 'baseball', type: 'regular', id: '60df19f0cd329a203f14dada' },
  { name: 'beer', type: 'regular', id: '60df19f0cd329a203f14dad9' },
  { name: 'beer', type: 'solid', id: '60df19f0cd329a203f14dad8' },
  { name: 'bible', type: 'regular', id: '60df19f0cd329a203f14dad7' },
  { name: 'bible', type: 'solid', id: '60df19f0cd329a203f14dad6' },
  { name: 'bomb', type: 'regular', id: '60df19f0cd329a203f14dad5' },
  { name: 'bomb', type: 'solid', id: '60df19f0cd329a203f14dad4' },
  { name: 'bus-school', type: 'regular', id: '60df19f0cd329a203f14dad3' },
  { name: 'bus-school', type: 'solid', id: '60df19f0cd329a203f14dad2' },
  { name: 'cabinet', type: 'regular', id: '60df19f0cd329a203f14dad1' },
  { name: 'cabinet', type: 'solid', id: '60df19f0cd329a203f14dad0' },
  {
    name: 'calendar-edit',
    type: 'regular',
    id: '60df19f0cd329a203f14dacf'
  },
  {
    name: 'calendar-edit',
    type: 'solid',
    id: '60df19f0cd329a203f14dace'
  },
  { name: 'car-wash', type: 'solid', id: '60df19f0cd329a203f14dacd' },
  { name: 'car-garage', type: 'solid', id: '60df19f0cd329a203f14dacc' },
  { name: 'car-mechanic', type: 'solid', id: '60df19f0cd329a203f14dacb' },
  { name: 'car-crash', type: 'solid', id: '60df19f0cd329a203f14daca' },
  {
    name: 'coffee-togo',
    type: 'regular',
    id: '60df19f0cd329a203f14dac9'
  },
  { name: 'coffee-togo', type: 'solid', id: '60df19f0cd329a203f14dac8' },
  { name: 'chess', type: 'solid', id: '60df19f0cd329a203f14dac7' },
  { name: 'dryer', type: 'solid', id: '60df19f0cd329a203f14dac6' },
  { name: 'washer', type: 'solid', id: '60df19f0cd329a203f14dac5' },
  { name: 'pointer', type: 'regular', id: '60df19f0cd329a203f14dac4' },
  { name: 'pointer', type: 'solid', id: '60df19f0cd329a203f14dac3' },
  { name: 'microchip', type: 'regular', id: '60df19f0cd329a203f14dac2' },
  { name: 'microchip', type: 'solid', id: '60df19f0cd329a203f14dac1' },
  { name: 'piano', type: 'solid', id: '60df19f0cd329a203f14dac0' },
  { name: 'file-export', type: 'solid', id: '60df19f0cd329a203f14dabf' },
  { name: 'file-import', type: 'solid', id: '60df19f0cd329a203f14dabe' },
  {
    name: 'flag-checkered',
    type: 'solid',
    id: '60df19f0cd329a203f14dabd'
  },
  {
    name: 'heart-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14dabc'
  },
  { name: 'heart-circle', type: 'solid', id: '60df19f0cd329a203f14dabb' },
  {
    name: 'heart-square',
    type: 'regular',
    id: '60df19f0cd329a203f14daba'
  },
  { name: 'heart-square', type: 'solid', id: '60df19f0cd329a203f14dab9' },
  { name: 'home-heart', type: 'regular', id: '60df19f0cd329a203f14dab8' },
  { name: 'home-heart', type: 'solid', id: '60df19f0cd329a203f14dab7' },
  {
    name: 'info-square',
    type: 'regular',
    id: '60df19f0cd329a203f14dab6'
  },
  { name: 'info-square', type: 'solid', id: '60df19f0cd329a203f14dab5' },
  { name: 'layer-plus', type: 'regular', id: '60df19f0cd329a203f14dab4' },
  { name: 'layer-plus', type: 'solid', id: '60df19f0cd329a203f14dab3' },
  {
    name: 'layer-minus',
    type: 'regular',
    id: '60df19f0cd329a203f14dab2'
  },
  { name: 'layer-minus', type: 'solid', id: '60df19f0cd329a203f14dab1' },
  { name: 'recycle', type: 'regular', id: '60df19f0cd329a203f14dab0' },
  {
    name: 'traffic-cone',
    type: 'regular',
    id: '60df19f0cd329a203f14daaf'
  },
  { name: 'traffic-cone', type: 'solid', id: '60df19f0cd329a203f14daae' },
  { name: 'wifi-2', type: 'regular', id: '60df19f0cd329a203f14daad' },
  { name: 'wifi-1', type: 'regular', id: '60df19f0cd329a203f14daac' },
  { name: 'wifi-0', type: 'regular', id: '60df19f0cd329a203f14daab' },
  { name: 'mask', type: 'regular', id: '60df19f0cd329a203f14daaa' },
  { name: 'mask', type: 'solid', id: '60df19f0cd329a203f14daa9' },
  { name: 'low-vision', type: 'regular', id: '60df19f0cd329a203f14daa8' },
  { name: 'low-vision', type: 'solid', id: '60df19f0cd329a203f14daa7' },
  { name: 'radiation', type: 'solid', id: '60df19f0cd329a203f14daa6' },
  { name: 'been-here', type: 'regular', id: '60df19f0cd329a203f14daa5' },
  { name: 'been-here', type: 'solid', id: '60df19f0cd329a203f14daa4' },
  {
    name: 'current-location',
    type: 'regular',
    id: '60df19f0cd329a203f14daa3'
  },
  {
    name: 'arrow-from-top',
    type: 'regular',
    id: '60df19f0cd329a203f14daa2'
  },
  {
    name: 'arrow-from-top',
    type: 'solid',
    id: '60df19f0cd329a203f14daa1'
  },
  {
    name: 'arrow-from-bottom',
    type: 'regular',
    id: '60df19f0cd329a203f14daa0'
  },
  {
    name: 'arrow-from-bottom',
    type: 'solid',
    id: '60df19f0cd329a203f14da9f'
  },
  {
    name: 'arrow-from-left',
    type: 'regular',
    id: '60df19f0cd329a203f14da9e'
  },
  {
    name: 'arrow-from-left',
    type: 'solid',
    id: '60df19f0cd329a203f14da9d'
  },
  {
    name: 'arrow-from-right',
    type: 'regular',
    id: '60df19f0cd329a203f14da9c'
  },
  {
    name: 'arrow-from-right',
    type: 'solid',
    id: '60df19f0cd329a203f14da9b'
  },
  {
    name: 'arrow-to-right',
    type: 'regular',
    id: '60df19f0cd329a203f14da9a'
  },
  {
    name: 'arrow-to-right',
    type: 'solid',
    id: '60df19f0cd329a203f14da99'
  },
  {
    name: 'arrow-to-left',
    type: 'regular',
    id: '60df19f0cd329a203f14da98'
  },
  {
    name: 'arrow-to-left',
    type: 'solid',
    id: '60df19f0cd329a203f14da97'
  },
  {
    name: 'arrow-to-top',
    type: 'regular',
    id: '60df19f0cd329a203f14da96'
  },
  { name: 'arrow-to-top', type: 'solid', id: '60df19f0cd329a203f14da95' },
  {
    name: 'arrow-to-bottom',
    type: 'regular',
    id: '60df19f0cd329a203f14da94'
  },
  {
    name: 'arrow-to-bottom',
    type: 'solid',
    id: '60df19f0cd329a203f14da93'
  },
  {
    name: 'book-reader',
    type: 'regular',
    id: '60df19f0cd329a203f14da92'
  },
  { name: 'book-reader', type: 'solid', id: '60df19f0cd329a203f14da91' },
  {
    name: 'edit-location',
    type: 'solid',
    id: '60df19f0cd329a203f14da90'
  },
  { name: 'ev-station', type: 'solid', id: '60df19f0cd329a203f14da8f' },
  { name: 'shapes', type: 'solid', id: '60df19f0cd329a203f14da8e' },
  { name: 'florist', type: 'solid', id: '60df19f0cd329a203f14da8d' },
  { name: 'pizza', type: 'solid', id: '60df19f0cd329a203f14da8c' },
  { name: 'scan', type: 'regular', id: '60df19f0cd329a203f14da8b' },
  {
    name: 'calendar-week',
    type: 'regular',
    id: '60df19f0cd329a203f14da8a'
  },
  {
    name: 'calendar-week',
    type: 'solid',
    id: '60df19f0cd329a203f14da89'
  },
  { name: 'glasses', type: 'regular', id: '60df19f0cd329a203f14da88' },
  {
    name: 'glasses-alt',
    type: 'regular',
    id: '60df19f0cd329a203f14da87'
  },
  {
    name: 'border-none',
    type: 'regular',
    id: '60df19f0cd329a203f14da86'
  },
  {
    name: 'border-inner',
    type: 'regular',
    id: '60df19f0cd329a203f14da85'
  },
  { name: 'dice-1', type: 'regular', id: '60df19f0cd329a203f14da84' },
  { name: 'dice-1', type: 'solid', id: '60df19f0cd329a203f14da83' },
  { name: 'dice-2', type: 'regular', id: '60df19f0cd329a203f14da82' },
  { name: 'dice-2', type: 'solid', id: '60df19f0cd329a203f14da81' },
  { name: 'dice-3', type: 'regular', id: '60df19f0cd329a203f14da80' },
  { name: 'dice-3', type: 'solid', id: '60df19f0cd329a203f14da7f' },
  { name: 'dice-4', type: 'regular', id: '60df19f0cd329a203f14da7e' },
  { name: 'dice-4', type: 'solid', id: '60df19f0cd329a203f14da7d' },
  { name: 'dice-5', type: 'regular', id: '60df19f0cd329a203f14da7c' },
  { name: 'dice-5', type: 'solid', id: '60df19f0cd329a203f14da7b' },
  { name: 'dice-6', type: 'regular', id: '60df19f0cd329a203f14da7a' },
  { name: 'dice-6', type: 'solid', id: '60df19f0cd329a203f14da79' },
  { name: 'webcam', type: 'regular', id: '60df19f0cd329a203f14da78' },
  { name: 'webcam', type: 'solid', id: '60df19f0cd329a203f14da77' },
  { name: 'spray-can', type: 'regular', id: '60df19f0cd329a203f14da76' },
  { name: 'spray-can', type: 'solid', id: '60df19f0cd329a203f14da75' },
  { name: 'file-archive', type: 'solid', id: '60df19f0cd329a203f14da74' },
  { name: 'sticker', type: 'regular', id: '60df19f0cd329a203f14da73' },
  { name: 'sticker', type: 'solid', id: '60df19f0cd329a203f14da72' },
  { name: 'tachometer', type: 'regular', id: '60df19f0cd329a203f14da71' },
  { name: 'tachometer', type: 'solid', id: '60df19f0cd329a203f14da70' },
  { name: 'thermometer', type: 'solid', id: '60df19f0cd329a203f14da6f' },
  { name: 'game', type: 'regular', id: '60df19f0cd329a203f14da6e' },
  { name: 'game', type: 'solid', id: '60df19f0cd329a203f14da6d' },
  { name: 'abacus', type: 'regular', id: '60df19f0cd329a203f14da6c' },
  {
    name: 'alarm-snooze',
    type: 'regular',
    id: '60df19f0cd329a203f14da6b'
  },
  { name: 'alarm-snooze', type: 'solid', id: '60df19f0cd329a203f14da6a' },
  {
    name: 'alarm-exclamation',
    type: 'regular',
    id: '60df19f0cd329a203f14da69'
  },
  {
    name: 'alarm-exclamation',
    type: 'solid',
    id: '60df19f0cd329a203f14da68'
  },
  {
    name: 'chevrons-left',
    type: 'solid',
    id: '60df19f0cd329a203f14da67'
  },
  {
    name: 'chevrons-right',
    type: 'solid',
    id: '60df19f0cd329a203f14da66'
  },
  { name: 'chevrons-up', type: 'solid', id: '60df19f0cd329a203f14da65' },
  {
    name: 'chevrons-down',
    type: 'solid',
    id: '60df19f0cd329a203f14da64'
  },
  { name: 'chevron-down', type: 'solid', id: '60df19f0cd329a203f14da63' },
  { name: 'chevron-up', type: 'solid', id: '60df19f0cd329a203f14da62' },
  {
    name: 'chevron-right',
    type: 'solid',
    id: '60df19f0cd329a203f14da61'
  },
  { name: 'chevron-left', type: 'solid', id: '60df19f0cd329a203f14da60' },
  { name: 'guitar-amp', type: 'solid', id: '60df19f0cd329a203f14da5f' },
  { name: 'up-arrow-alt', type: 'solid', id: '60df19f0cd329a203f14da5e' },
  {
    name: 'down-arrow-alt',
    type: 'solid',
    id: '60df19f0cd329a203f14da5d'
  },
  {
    name: 'left-arrow-alt',
    type: 'solid',
    id: '60df19f0cd329a203f14da5c'
  },
  {
    name: 'right-arrow-alt',
    type: 'solid',
    id: '60df19f0cd329a203f14da5b'
  },
  { name: 'medal', type: 'regular', id: '60df19f0cd329a203f14da5a' },
  { name: 'medal', type: 'solid', id: '60df19f0cd329a203f14da59' },
  {
    name: 'shopping-bags',
    type: 'solid',
    id: '60df19f0cd329a203f14da58'
  },
  { name: 'baseball', type: 'solid', id: '60df19f0cd329a203f14da57' },
  { name: 'task-x', type: 'regular', id: '60df19f0cd329a203f14da56' },
  { name: 'basketball', type: 'solid', id: '60df19f0cd329a203f14da55' },
  {
    name: 'barcode-reader',
    type: 'regular',
    id: '60df19f0cd329a203f14da54'
  },
  { name: 'blanket', type: 'regular', id: '60df19f0cd329a203f14da53' },
  { name: 'blanket', type: 'solid', id: '60df19f0cd329a203f14da52' },
  { name: 'binoculars', type: 'solid', id: '60df19f0cd329a203f14da51' },
  { name: 'bone', type: 'regular', id: '60df19f0cd329a203f14da50' },
  { name: 'bone', type: 'solid', id: '60df19f0cd329a203f14da4f' },
  { name: 'bong', type: 'regular', id: '60df19f0cd329a203f14da4e' },
  { name: 'bong', type: 'solid', id: '60df19f0cd329a203f14da4d' },
  { name: 'book-alt', type: 'regular', id: '60df19f0cd329a203f14da4c' },
  { name: 'book-alt', type: 'solid', id: '60df19f0cd329a203f14da4b' },
  { name: 'book-heart', type: 'regular', id: '60df19f0cd329a203f14da4a' },
  { name: 'book-heart', type: 'solid', id: '60df19f0cd329a203f14da49' },
  { name: 'book-add', type: 'regular', id: '60df19f0cd329a203f14da48' },
  { name: 'book-add', type: 'solid', id: '60df19f0cd329a203f14da47' },
  { name: 'bracket', type: 'regular', id: '60df19f0cd329a203f14da46' },
  { name: 'brain', type: 'regular', id: '60df19f0cd329a203f14da45' },
  { name: 'brain', type: 'solid', id: '60df19f0cd329a203f14da44' },
  {
    name: 'border-outer',
    type: 'regular',
    id: '60df19f0cd329a203f14da43'
  },
  { name: 'braille', type: 'regular', id: '60df19f0cd329a203f14da42' },
  { name: 'window-alt', type: 'regular', id: '60df19f0cd329a203f14da41' },
  { name: 'window-alt', type: 'solid', id: '60df19f0cd329a203f14da40' },
  {
    name: 'calendar-heart',
    type: 'regular',
    id: '60df19f0cd329a203f14da3f'
  },
  {
    name: 'calendar-heart',
    type: 'solid',
    id: '60df19f0cd329a203f14da3e'
  },
  { name: 'wine', type: 'regular', id: '60df19f0cd329a203f14da3d' },
  { name: 'vial', type: 'regular', id: '60df19f0cd329a203f14da3c' },
  { name: 'color-fill', type: 'regular', id: '60df19f0cd329a203f14da3b' },
  { name: 'capsule', type: 'regular', id: '60df19f0cd329a203f14da3a' },
  { name: 'eraser', type: 'regular', id: '60df19f0cd329a203f14da39' },
  { name: 'drink', type: 'regular', id: '60df19f0cd329a203f14da38' },
  { name: 'cctv', type: 'regular', id: '60df19f0cd329a203f14da37' },
  { name: 'cctv', type: 'solid', id: '60df19f0cd329a203f14da36' },
  { name: 'chair', type: 'regular', id: '60df19f0cd329a203f14da35' },
  {
    name: 'network-chart',
    type: 'regular',
    id: '60df19f0cd329a203f14da34'
  },
  {
    name: 'network-chart',
    type: 'solid',
    id: '60df19f0cd329a203f14da33'
  },
  { name: 'vector', type: 'regular', id: '60df19f0cd329a203f14da32' },
  { name: 'vector', type: 'solid', id: '60df19f0cd329a203f14da31' },
  {
    name: 'calendar-exclamation',
    type: 'regular',
    id: '60df19f0cd329a203f14da30'
  },
  {
    name: 'calendar-exclamation',
    type: 'solid',
    id: '60df19f0cd329a203f14da2f'
  },
  {
    name: 'calendar-star',
    type: 'regular',
    id: '60df19f0cd329a203f14da2e'
  },
  {
    name: 'calendar-star',
    type: 'solid',
    id: '60df19f0cd329a203f14da2d'
  },
  {
    name: 'camera-home',
    type: 'regular',
    id: '60df19f0cd329a203f14da2c'
  },
  { name: 'camera-home', type: 'solid', id: '60df19f0cd329a203f14da2b' },
  {
    name: 'camera-movie',
    type: 'regular',
    id: '60df19f0cd329a203f14da2a'
  },
  { name: 'camera-movie', type: 'solid', id: '60df19f0cd329a203f14da29' },
  { name: 'backpack', type: 'solid', id: '60df19f0cd329a203f14da28' },
  {
    name: 'cart-download',
    type: 'solid',
    id: '60df19f0cd329a203f14da27'
  },
  { name: 'cart-add', type: 'solid', id: '60df19f0cd329a203f14da26' },
  { name: 'car-battery', type: 'solid', id: '60df19f0cd329a203f14da25' },
  {
    name: 'caret-right-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14da24'
  },
  {
    name: 'caret-left-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14da23'
  },
  {
    name: 'caret-up-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14da22'
  },
  {
    name: 'caret-down-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14da21'
  },
  {
    name: 'caret-right-square',
    type: 'regular',
    id: '60df19f0cd329a203f14da20'
  },
  {
    name: 'caret-right-square',
    type: 'solid',
    id: '60df19f0cd329a203f14da1f'
  },
  {
    name: 'caret-up-square',
    type: 'regular',
    id: '60df19f0cd329a203f14da1e'
  },
  {
    name: 'caret-up-square',
    type: 'solid',
    id: '60df19f0cd329a203f14da1d'
  },
  {
    name: 'caret-left-square',
    type: 'regular',
    id: '60df19f0cd329a203f14da1c'
  },
  {
    name: 'caret-left-square',
    type: 'solid',
    id: '60df19f0cd329a203f14da1b'
  },
  {
    name: 'caret-down-square',
    type: 'regular',
    id: '60df19f0cd329a203f14da1a'
  },
  {
    name: 'caret-down-square',
    type: 'solid',
    id: '60df19f0cd329a203f14da19'
  },
  { name: 'shield-x', type: 'regular', id: '60df19f0cd329a203f14da18' },
  { name: 'shield-x', type: 'solid', id: '60df19f0cd329a203f14da17' },
  {
    name: 'line-chart-down',
    type: 'regular',
    id: '60df19f0cd329a203f14da16'
  },
  {
    name: 'chevron-down-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14da15'
  },
  {
    name: 'chevron-down-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14da14'
  },
  {
    name: 'chevron-up-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14da13'
  },
  {
    name: 'chevron-up-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14da12'
  },
  {
    name: 'chevron-left-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14da11'
  },
  {
    name: 'chevron-left-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14da10'
  },
  {
    name: 'chevron-right-circle',
    type: 'regular',
    id: '60df19f0cd329a203f14da0f'
  },
  {
    name: 'chevron-right-circle',
    type: 'solid',
    id: '60df19f0cd329a203f14da0e'
  },
  {
    name: 'chevron-down-square',
    type: 'regular',
    id: '60df19f0cd329a203f14da0d'
  },
  {
    name: 'chevron-down-square',
    type: 'solid',
    id: '60df19f0cd329a203f14da0c'
  },
  {
    name: 'chevron-up-square',
    type: 'regular',
    id: '60df19f0cd329a203f14da0b'
  },
  {
    name: 'chevron-up-square',
    type: 'solid',
    id: '60df19f0cd329a203f14da0a'
  },
  {
    name: 'chevron-left-square',
    type: 'regular',
    id: '60df19f0cd329a203f14da09'
  },
  {
    name: 'chevron-left-square',
    type: 'solid',
    id: '60df19f0cd329a203f14da08'
  },
  {
    name: 'chevron-right-square',
    type: 'regular',
    id: '60df19f0cd329a203f14da07'
  },
  {
    name: 'chevron-right-square',
    type: 'solid',
    id: '60df19f0cd329a203f14da06'
  },
  { name: 'church', type: 'regular', id: '60df19f0cd329a203f14da05' },
  { name: 'church', type: 'solid', id: '60df19f0cd329a203f14da04' },
  { name: 'coin', type: 'regular', id: '60df19f0cd329a203f14da03' },
  { name: 'coin', type: 'solid', id: '60df19f0cd329a203f14da02' },
  { name: 'coin-stack', type: 'regular', id: '60df19f0cd329a203f14da01' },
  { name: 'coin-stack', type: 'solid', id: '60df19f0cd329a203f14da00' },
  { name: 'unite', type: 'regular', id: '60df19f0cd329a203f14d9ff' },
  {
    name: 'minus-front',
    type: 'regular',
    id: '60df19f0cd329a203f14d9fe'
  },
  { name: 'intersect', type: 'regular', id: '60df19f0cd329a203f14d9fd' },
  { name: 'exclude', type: 'regular', id: '60df19f0cd329a203f14d9fc' },
  { name: 'minus-back', type: 'regular', id: '60df19f0cd329a203f14d9fb' },
  { name: 'merge', type: 'regular', id: '60df19f0cd329a203f14d9fa' },
  { name: 'trim', type: 'regular', id: '60df19f0cd329a203f14d9f9' },
  { name: 'outline', type: 'regular', id: '60df19f0cd329a203f14d9f8' },
  { name: 'bullseye', type: 'solid', id: '60df19f0cd329a203f14d9f7' },
  { name: 'meteor', type: 'regular', id: '60df19f0cd329a203f14d9f6' },
  { name: 'meteor', type: 'solid', id: '60df19f0cd329a203f14d9f5' },
  { name: 'refresh', type: 'regular', id: '60df19f0cd329a203f14d9f4' },
  { name: 'home-smile', type: 'regular', id: '60df19f0cd329a203f14d9f3' },
  { name: 'home-smile', type: 'solid', id: '60df19f0cd329a203f14d9f2' },
  {
    name: 'envelope-open',
    type: 'regular',
    id: '60df19f0cd329a203f14d9f1'
  },
  {
    name: 'envelope-open',
    type: 'solid',
    id: '60df19f0cd329a203f14d9f0'
  },
  { name: 'dev-to', type: 'logo', id: '60df19f0cd329a203f14d9ef' },
  {
    name: 'message-alt-add',
    type: 'regular',
    id: '60df19f0cd329a203f14d9ee'
  },
  {
    name: 'message-alt-add',
    type: 'solid',
    id: '60df19f0cd329a203f14d9ed'
  },
  {
    name: 'message-alt-check',
    type: 'regular',
    id: '60df19f0cd329a203f14d9ec'
  },
  {
    name: 'message-alt-check',
    type: 'solid',
    id: '60df19f0cd329a203f14d9eb'
  },
  {
    name: 'message-alt-error',
    type: 'regular',
    id: '60df19f0cd329a203f14d9ea'
  },
  {
    name: 'message-alt-error',
    type: 'solid',
    id: '60df19f0cd329a203f14d9e9'
  },
  {
    name: 'message-alt-x',
    type: 'regular',
    id: '60df19f0cd329a203f14d9e8'
  },
  {
    name: 'message-alt-x',
    type: 'solid',
    id: '60df19f0cd329a203f14d9e7'
  },
  {
    name: 'message-alt-minus',
    type: 'regular',
    id: '60df19f0cd329a203f14d9e6'
  },
  {
    name: 'message-alt-minus',
    type: 'solid',
    id: '60df19f0cd329a203f14d9e5'
  },
  {
    name: 'message-alt-edit',
    type: 'regular',
    id: '60df19f0cd329a203f14d9e4'
  },
  {
    name: 'message-alt-edit',
    type: 'solid',
    id: '60df19f0cd329a203f14d9e3'
  },
  {
    name: 'message-alt-detail',
    type: 'regular',
    id: '60df19f0cd329a203f14d9e2'
  },
  {
    name: 'message-alt-detail',
    type: 'solid',
    id: '60df19f0cd329a203f14d9e1'
  },
  {
    name: 'message-rounded-check',
    type: 'regular',
    id: '60df19f0cd329a203f14d9e0'
  },
  {
    name: 'message-rounded-check',
    type: 'solid',
    id: '60df19f0cd329a203f14d9df'
  },
  {
    name: 'message-rounded-error',
    type: 'regular',
    id: '60df19f0cd329a203f14d9de'
  },
  {
    name: 'message-rounded-error',
    type: 'solid',
    id: '60df19f0cd329a203f14d9dd'
  },
  {
    name: 'message-rounded-x',
    type: 'regular',
    id: '60df19f0cd329a203f14d9dc'
  },
  {
    name: 'message-rounded-x',
    type: 'solid',
    id: '60df19f0cd329a203f14d9db'
  },
  {
    name: 'message-rounded-minus',
    type: 'regular',
    id: '60df19f0cd329a203f14d9da'
  },
  {
    name: 'message-rounded-minus',
    type: 'solid',
    id: '60df19f0cd329a203f14d9d9'
  },
  {
    name: 'message-rounded-edit',
    type: 'regular',
    id: '60df19f0cd329a203f14d9d8'
  },
  {
    name: 'message-rounded-edit',
    type: 'solid',
    id: '60df19f0cd329a203f14d9d7'
  },
  {
    name: 'message-rounded-add',
    type: 'regular',
    id: '60df19f0cd329a203f14d9d6'
  },
  {
    name: 'message-rounded-add',
    type: 'solid',
    id: '60df19f0cd329a203f14d9d5'
  },
  {
    name: 'message-rounded-detail',
    type: 'regular',
    id: '60df19f0cd329a203f14d9d4'
  },
  {
    name: 'message-rounded-detail',
    type: 'solid',
    id: '60df19f0cd329a203f14d9d3'
  },
  {
    name: 'message-check',
    type: 'regular',
    id: '60df19f0cd329a203f14d9d2'
  },
  {
    name: 'message-check',
    type: 'solid',
    id: '60df19f0cd329a203f14d9d1'
  },
  {
    name: 'message-error',
    type: 'regular',
    id: '60df19f0cd329a203f14d9d0'
  },
  {
    name: 'message-error',
    type: 'solid',
    id: '60df19f0cd329a203f14d9cf'
  },
  { name: 'message-x', type: 'regular', id: '60df19f0cd329a203f14d9ce' },
  { name: 'message-x', type: 'solid', id: '60df19f0cd329a203f14d9cd' },
  {
    name: 'message-minus',
    type: 'regular',
    id: '60df19f0cd329a203f14d9cc'
  },
  {
    name: 'message-minus',
    type: 'solid',
    id: '60df19f0cd329a203f14d9cb'
  },
  {
    name: 'message-edit',
    type: 'regular',
    id: '60df19f0cd329a203f14d9ca'
  },
  { name: 'message-edit', type: 'solid', id: '60df19f0cd329a203f14d9c9' },
  {
    name: 'message-add',
    type: 'regular',
    id: '60df19f0cd329a203f14d9c8'
  },
  { name: 'message-add', type: 'solid', id: '60df19f0cd329a203f14d9c7' },
  {
    name: 'message-detail',
    type: 'regular',
    id: '60df19f0cd329a203f14d9c6'
  },
  {
    name: 'message-detail',
    type: 'solid',
    id: '60df19f0cd329a203f14d9c5'
  },
  {
    name: 'message-square-check',
    type: 'regular',
    id: '60df19f0cd329a203f14d9c4'
  },
  {
    name: 'message-square-check',
    type: 'solid',
    id: '60df19f0cd329a203f14d9c3'
  },
  {
    name: 'message-square-error',
    type: 'regular',
    id: '60df19f0cd329a203f14d9c2'
  },
  {
    name: 'message-square-error',
    type: 'solid',
    id: '60df19f0cd329a203f14d9c1'
  },
  {
    name: 'message-square-x',
    type: 'regular',
    id: '60df19f0cd329a203f14d9c0'
  },
  {
    name: 'message-square-x',
    type: 'solid',
    id: '60df19f0cd329a203f14d9bf'
  },
  {
    name: 'message-square-minus',
    type: 'regular',
    id: '60df19f0cd329a203f14d9be'
  },
  {
    name: 'message-square-minus',
    type: 'solid',
    id: '60df19f0cd329a203f14d9bd'
  },
  {
    name: 'message-square-edit',
    type: 'regular',
    id: '60df19f0cd329a203f14d9bc'
  },
  {
    name: 'message-square-edit',
    type: 'solid',
    id: '60df19f0cd329a203f14d9bb'
  },
  {
    name: 'message-square-add',
    type: 'regular',
    id: '60df19f0cd329a203f14d9ba'
  },
  {
    name: 'message-square-add',
    type: 'solid',
    id: '60df19f0cd329a203f14d9b9'
  },
  {
    name: 'message-square-detail',
    type: 'regular',
    id: '60df19f0cd329a203f14d9b8'
  },
  {
    name: 'message-square-detail',
    type: 'solid',
    id: '60df19f0cd329a203f14d9b7'
  },
  {
    name: 'comment-check',
    type: 'regular',
    id: '60df19f0cd329a203f14d9b6'
  },
  {
    name: 'comment-check',
    type: 'solid',
    id: '60df19f0cd329a203f14d9b5'
  },
  {
    name: 'comment-error',
    type: 'regular',
    id: '60df19f0cd329a203f14d9b4'
  },
  { name: 'comment-x', type: 'regular', id: '60df19f0cd329a203f14d9b3' },
  { name: 'comment-x', type: 'solid', id: '60df19f0cd329a203f14d9b2' },
  {
    name: 'comment-edit',
    type: 'regular',
    id: '60df19f0cd329a203f14d9b1'
  },
  { name: 'comment-edit', type: 'solid', id: '60df19f0cd329a203f14d9b0' },
  {
    name: 'comment-minus',
    type: 'regular',
    id: '60df19f0cd329a203f14d9af'
  },
  {
    name: 'comment-minus',
    type: 'solid',
    id: '60df19f0cd329a203f14d9ae'
  },
  {
    name: 'comment-add',
    type: 'regular',
    id: '60df19f0cd329a203f14d9ad'
  },
  {
    name: 'comment-detail',
    type: 'regular',
    id: '60df19f0cd329a203f14d9ac'
  },
  { name: 'cookie', type: 'regular', id: '60df19f0cd329a203f14d9ab' },
  { name: 'cookie', type: 'solid', id: '60df19f0cd329a203f14d9aa' },
  { name: 'copyright', type: 'solid', id: '60df19f0cd329a203f14d9a9' },
  {
    name: 'credit-card-front',
    type: 'regular',
    id: '60df19f0cd329a203f14d9a8'
  },
  {
    name: 'credit-card-front',
    type: 'solid',
    id: '60df19f0cd329a203f14d9a7'
  },
  { name: 'crop', type: 'solid', id: '60df19f0cd329a203f14d9a6' },
  { name: 'diamond', type: 'solid', id: '60df19f0cd329a203f14d9a5' },
  { name: 'door-open', type: 'regular', id: '60df19f0cd329a203f14d9a4' },
  { name: 'door-open', type: 'solid', id: '60df19f0cd329a203f14d9a3' },
  {
    name: 'donate-heart',
    type: 'regular',
    id: '60df19f0cd329a203f14d9a2'
  },
  { name: 'donate-heart', type: 'solid', id: '60df19f0cd329a203f14d9a1' },
  {
    name: 'donate-blood',
    type: 'regular',
    id: '60df19f0cd329a203f14d9a0'
  },
  { name: 'donate-blood', type: 'solid', id: '60df19f0cd329a203f14d99f' },
  {
    name: 'shape-polygon',
    type: 'regular',
    id: '60df19f0cd329a203f14d99e'
  },
  { name: 'zoom', type: 'logo', id: '60df19f0cd329a203f14d99d' },
  {
    name: 'microsoft-teams',
    type: 'logo',
    id: '60df19f0cd329a203f14d99c'
  },
  { name: 'blender', type: 'logo', id: '60df19f0cd329a203f14d99b' },
  { name: 'kubernetes', type: 'logo', id: '60df19f0cd329a203f14d99a' },
  { name: 'google-cloud', type: 'logo', id: '60df19f0cd329a203f14d999' },
  { name: 'django', type: 'logo', id: '60df19f0cd329a203f14d998' },
  { name: 'spring-boot', type: 'logo', id: '60df19f0cd329a203f14d997' },
  { name: 'tux', type: 'logo', id: '60df19f0cd329a203f14d996' },
  { name: 'markdown', type: 'logo', id: '60df19f0cd329a203f14d995' },
  { name: 'python', type: 'logo', id: '60df19f0cd329a203f14d994' },
  { name: 'ok-ru', type: 'logo', id: '60df19f0cd329a203f14d993' },
  { name: 'firebase', type: 'logo', id: '60df19f0cd329a203f14d992' },
  { name: 'c-plus-plus', type: 'logo', id: '60df19f0cd329a203f14d991' },
  {
    name: 'bookmark-heart',
    type: 'regular',
    id: '60df19f0cd329a203f14d990'
  },
  {
    name: 'bookmark-heart',
    type: 'solid',
    id: '60df19f0cd329a203f14d98f'
  },
  { name: 'sort-alt-2', type: 'regular', id: '60df19f0cd329a203f14d98e' },
  { name: 'category', type: 'regular', id: '60df19f0cd329a203f14d98d' },
  { name: 'category', type: 'solid', id: '60df19f0cd329a203f14d98c' },
  {
    name: 'category-alt',
    type: 'regular',
    id: '60df19f0cd329a203f14d98b'
  },
  { name: 'category-alt', type: 'solid', id: '60df19f0cd329a203f14d98a' },
  {
    name: 'bookmark-alt',
    type: 'regular',
    id: '60df19f0cd329a203f14d989'
  },
  { name: 'bookmark-alt', type: 'solid', id: '60df19f0cd329a203f14d988' },
  {
    name: 'bookmark-alt-plus',
    type: 'regular',
    id: '60df19f0cd329a203f14d987'
  },
  {
    name: 'bookmark-alt-plus',
    type: 'solid',
    id: '60df19f0cd329a203f14d986'
  },
  {
    name: 'bookmark-alt-minus',
    type: 'regular',
    id: '60df19f0cd329a203f14d985'
  },
  {
    name: 'bookmark-alt-minus',
    type: 'solid',
    id: '60df19f0cd329a203f14d984'
  },
  { name: 'face-mask', type: 'solid', id: '60df19f0cd329a203f14d983' },
  { name: 'tv', type: 'solid', id: '60df19f0cd329a203f14d982' },
  { name: 'tag-alt', type: 'regular', id: '60df19f0cd329a203f14d981' },
  { name: 'tag-alt', type: 'solid', id: '60df19f0cd329a203f14d980' },
  { name: 'movie-play', type: 'regular', id: '60df19f0cd329a203f14d97f' },
  { name: 'movie-play', type: 'solid', id: '60df19f0cd329a203f14d97e' },
  { name: 'user-account', type: 'solid', id: '60df19f0cd329a203f14d97d' },
  { name: 'expand-alt', type: 'regular', id: '60df19f0cd329a203f14d97c' },
  { name: 'library', type: 'regular', id: '60df19f0cd329a203f14d97b' },
  { name: 'trip', type: 'regular', id: '60df19f0cd329a203f14d97a' },
  { name: 'virus', type: 'solid', id: '60df19f0cd329a203f14d979' },
  { name: 'virus-block', type: 'solid', id: '60df19f0cd329a203f14d978' }
];

export default icons;
