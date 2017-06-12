<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/STAR/LAMP">STAR/LAMP Market</router-link></li>
        <li><router-link to="/LAMP/DIAM">LAMP/DIAM Market</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
    <div class="balance">
      Your balance is:
      <ul>
        <li>{{$store.state.STAR}} stars</li>
        <li>{{$store.state.LAMP}} lamps</li>
        <li>{{$store.state.DIAM}} diamonds</li>
      </ul>
    </div>
  </div>
</template>
