<template>
  <div class="modal">
    <div class="modal-content">
      <h2>오류</h2>
      <p>ID나 패스워드를 확인해주세요.</p>
      <div class="modal-close">
        <p>확인</p>
      </div>
    </div>
  </div>
</template>
<script>
import {krmanage} from "@/plugins/krmanage.js";

export default {
  name: 'modal',
  components: {},
  setup() {

    const { $api } = krmanage()

    return {

    }
  }
}

</script>
