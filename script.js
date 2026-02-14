document.addEventListener('DOMContentLoaded', ()=>{
  // Dynamically generate posts from available images (lagann1..lagann18)
  const posts = [];
  const totalImages = 18;
  const baseDate = new Date(2025, 8, 1); // Sept 1, 2025
  for(let i=1;i<=totalImages;i++){
    const id = i;
    const title = `Gurren Snapshot ${i}`;
    const d = new Date(baseDate.getTime());
    d.setDate(baseDate.getDate() + i * 7);
    const dateStr = d.toISOString().slice(0,10);
    const img = `img/lagann${i}.jpg`;
    const likes = Math.floor(100 + Math.random()*3000);
    const desc = [`A moment from episode ${Math.max(1,i%27)}.` , 'Spiral energy in full display.', 'A banner of courage.', 'A fierce clash on the surface.', 'A quiet moment before the storm.'][i%5];
    posts.push({id,title,date:dateStr,img,likes,desc});
  }

  const postsContainer = document.getElementById('postsContainer');
  const gridBtn = document.getElementById('gridBtn');
  const singleBtn = document.getElementById('singleBtn');
  const openPostBtn = document.getElementById('openPostBtn');
  const postModal = document.getElementById('postModal');
  const closeModalX = document.getElementById('closeModalX');
  const modalClose = document.getElementById('modalClose');

  let view = 'grid';

  function render(){
    postsContainer.className = 'posts ' + (view==='grid' ? 'grid-view' : 'single-view row g-2');
    postsContainer.innerHTML = '';

    if(view === 'grid'){
      // use CSS Grid (defined in styles.css) to ensure equal horizontal and vertical gaps
      posts.forEach(p=>{
        const col = document.createElement('div');
        col.className = 'post-item';
        col.innerHTML = `<img src="${p.img}" alt="${p.title}" class="post-img">`;
        postsContainer.appendChild(col);
      });
    } else {
      // single view: each item full-width but card centered and constrained to ~8 columns on md+
      posts.forEach(p=>{
        const item = document.createElement('div');
        item.className = 'post-item col-12 mb-3 d-flex justify-content-center';
        item.innerHTML = `
          <div class="single-card">
            <div class="banner">
              <div class="title">${p.title}</div>
              <div class="date">${p.date}</div>
            </div>
            <img src="${p.img}" alt="${p.title}" class="post-img">
            <div class="footer">
              <div class="likes">${p.likes} likes</div>
              <div class="desc mt-2">${p.desc}</div>
            </div>
          </div>`;
        postsContainer.appendChild(item);
      });
    }
  }

  gridBtn.addEventListener('click', ()=>{
    view = 'grid';
    gridBtn.classList.add('active');
    singleBtn.classList.remove('active');
    render();
  });
  singleBtn.addEventListener('click', ()=>{
    view = 'single';
    singleBtn.classList.add('active');
    gridBtn.classList.remove('active');
    render();
  });

  openPostBtn.addEventListener('click', ()=>{
    postModal.classList.remove('d-none');
  });
  closeModalX.addEventListener('click', ()=> postModal.classList.add('d-none'));
  modalClose.addEventListener('click', ()=> postModal.classList.add('d-none'));

  // hide secondary header on scroll down
  let lastY = window.scrollY;
  const secondary = document.getElementById('secondaryHeader');
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY;
    if(y > lastY && y > 60){
      secondary.classList.add('hide');
    } else {
      secondary.classList.remove('hide');
    }
    lastY = y;
  });

  render();
});
