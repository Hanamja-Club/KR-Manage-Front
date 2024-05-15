<template>
  <body>
    <hr style="height: 5px; background-color: #007bff; margin-bottom: 15px">
    <section id="content">
      <h1 style="font-size: 20pt">그룹</h1>
      <select id="menu" @change="selectedGroupSeq = $event.target.value">
        <option value="">모든 그룹</option>
        <option v-for="(itm, idx) in groupList" :key="idx" :value="itm.groupSeq">{{ itm.groupName }}</option>
      </select>
      <div id="typeNick">
        <input type="text" id="write" placeholder="선택한 그룹명" :value="pageFunc.selectUpdateGroup()" @input="targetGroupName = $event.target.value" />
      </div>
      <button id="addNew" @click="pageFunc.deleteGroup()">그룹 삭제</button> <br>
      <button id="addNew" @click="pageFunc.updateGroupName">그룹명 변경</button>
      <hr style="margin-bottom: 35px; margin-top: 35px;">

      <h1 style="font-size: 20pt">그룹 추가 (클럽, 크루)</h1>
      <select id="menu" style="margin-bottom: 35px;" @change="addGroup.groupType = $event.target.value">
        <option value="">그룹 구분</option>
        <option value="club">클럽</option>
        <option value="crew">크루</option>
      </select>
      <div id="typeNick">
        <input type="text" id="write" placeholder="추가할 그룹명" @change="addGroup.groupName = $event.target.value" />
      </div>
      <button id="addNew" @click="pageFunc.saveGroup()">그룹 추가</button>
      <hr style="margin-bottom: 35px; margin-top: 35px;">

      <h1 style="font-size: 20pt">그룹 운영진 추가</h1>
      <select id="menu" @change="addManagerInfo.groupSeq = $event.target.value">
        <option value="">모든 그룹</option>
        <option v-for="(itm, idx) in groupList" :key="idx" :value="itm.groupSeq">{{ itm.groupName }}</option>
      </select>
      <div id="typeNick">
        <input type="text" id="write" placeholder="운영진 아이디" @input="addManagerInfo.memberId = $event.target.value" style="margin-bottom: 20px" />
        <input type="text" id="write" placeholder="운영진 닉네임" @input="addManagerInfo.memberName = $event.target.value" style="margin-bottom: 20px"/>
        <input type="password" id="write" placeholder="운영진 비밀번호" @input="addManagerInfo.memberPassword = $event.target.value" />
      </div>
      <button id="addNew" @click="pageFunc.saveGroupManager">운영진 추가</button>
      <hr style="margin-bottom: 35px; margin-top: 35px;">
      <h1 style="font-size: 20pt">그룹 운영진 컨트롤</h1>
      <button id="addNew" @click="pageFunc.movePage('/ManagerControl')">페이지 이동</button>
    </section>
  </body>
</template>
<script>

import {krmanage} from "@/plugins/krmanage.js";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {onMounted, ref, watch} from "vue";

export default {
  name: 'AdminMain',
  components: {},
  setup() {

    const { $api, $ui, $utils } = krmanage()
    const router = useRouter();
    const store = useStore();

    const groupList = ref([])

    const selectedGroupSeq = ref({})

    const addGroup = ref({
      groupName: "",
      groupType: "",
    })

    const targetGroupName = ref("")

    const addManagerInfo = ref({
      groupSeq: 0,
      memberId: "",
      memberName: "",
      memberPassword: "",
    })

    const pageFunc = {
      getAllGroups: () => {
        $api('api/admin/group', {}, 'get', res => {
          // console.log(res)
          groupList.value = res.response
        }, err => {
          $ui.alert({
            title: "네트워크 오류",
            content: "권한이 없거나 세션이 없습니다. 다시 로그인 해주세요."
          });
          router.push("/")
        })
      },
      deleteGroup: () => {
        if ($utils.isEmpty(selectedGroupSeq.value)) {
          $ui.alert({
            title: "실패",
            content: "그룹을 선택해주세요."
          });
          return false
        }
        $api(`api/admin/group/${selectedGroupSeq.value}`, {}, 'delete', res => {
          console.log(res)
          if (res.code === "000") {
            $ui.alert({
              title: "성공",
              content: res.message
            });
            pageFunc.getAllGroups()
            document.querySelector("#menu").value = ""
          }
        }, err => {
          $ui.alert({
            title: "네트워크 오류",
            content: "권한이 없거나 세션이 없습니다. 다시 로그인 해주세요."
          });
          router.push("/")
        })
      },
      saveGroup: () => {
        $api('api/admin/group', addGroup.value, 'post', res => {
          if ($utils.isEmpty(addGroup.value.groupName) || $utils.isEmpty(addGroup.value.groupType)) {
            $ui.alert({
              title: "실패",
              content: "그룹 저장 필수 값이 누락되었습니다."
            });
            return false
          }
          if (res.code === "000") {
            $ui.alert({
              title: "성공",
              content: res.message
            });
            pageFunc.getAllGroups()
            document.querySelector("#menu").value = ""
            document.querySelector("#write").value = ""
          }
        }, err => {
          $ui.alert({
            title: "네트워크 오류",
            content: "권한이 없거나 세션이 없습니다. 다시 로그인 해주세요."
          });
          router.push("/")
        })
      },
      selectUpdateGroup: () => {
        return groupList.value.find(itm => itm.groupSeq == selectedGroupSeq.value)?.groupName
      },
      updateGroupName: () => {
        if ($utils.isEmpty(selectedGroupSeq.value)) {
          $ui.alert({
            title: "실패",
            content: "그룹을 선택해주세요."
          });
          return false
        }
        console.log(targetGroupName.value)

        $api(`api/admin/group/${selectedGroupSeq.value}`, {
          groupName: targetGroupName.value
        }, 'patch', res => {
          console.log(res)
          if (res.code === "000") {
            $ui.alert({
              title: "성공",
              content: res.message
            });
            pageFunc.getAllGroups()
            document.querySelector("#menu").value = ""
            document.querySelector("#write").value = ""
          }
        }, err => {
          $ui.alert({
            title: "네트워크 오류",
            content: "권한이 없거나 세션이 없습니다. 다시 로그인 해주세요."
          });
          router.push("/")
        })
      },
      saveGroupManager: () => {
        // console.log(addManagerInfo.value)
        if ($utils.isEmpty(addManagerInfo.value.memberName) ||
            addManagerInfo.value.groupSeq === 0 ||
            $utils.isEmpty(addManagerInfo.value.memberId) ||
            $utils.isEmpty(addManagerInfo.value.memberPassword)
        ) {
          $ui.alert({
            title: "실패",
            content: "필수 입력정보가 누락되었습니다. 다시 한번 확인해주세요."
          });
          return false;
        }
        $api('api/admin/member', addManagerInfo.value, 'post', res => {
          console.log(res)
        }, err => {
          $ui.alert({
            title: "네트워크 오류",
            content: "권한이 없거나 세션이 없습니다. 다시 로그인 해주세요."
          });
          router.push("/")
        })
      },
      movePage: pageName => {
        router.push(pageName)
      }
    }

    onMounted(() => {
      pageFunc.getAllGroups()
    })

    watch(selectedGroupSeq, () => {
      targetGroupName.value = pageFunc.selectUpdateGroup()
    })

    return{
      groupList,
      selectedGroupSeq,
      addGroup,
      targetGroupName,
      addManagerInfo,
      pageFunc,
    }
  }
}
</script>
<style scoped></style>