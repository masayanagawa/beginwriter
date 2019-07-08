<template>
<div>
    <div class="window">
        <div class="index-wrapper">
            <h1>begin</h1>
            <p>A New page, Begin the write.</p>
        </div>
    </div>
</div>
</template>

<script>
// localStorage.clear()
export default {
  
}
</script>

<style>
.window {
    width: 100vw;
    height: 100vh;
}

.index-wrapper {
    padding-top: 50px;
    width: 100vw;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
}

.index-wrapper h1 {
    padding: 30px 0;
    font-size: 90px;
    font-weight: bold;
}

.index-wrapper p {
    font-size: 26px;
    font-weight: bold;
}
</style>
