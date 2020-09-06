<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" @click="isShowAddUser = true"
        >添加人员</el-button
      >
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="110">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="创建人" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="是否启用"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <!-- <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
          <el-switch v-model="scope.row.status"></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="更新时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small"
            >编辑<i class="el-icon-edit"></i
          ></el-button>
          <el-button type="danger" size="small"
            >删除<i class="el-icon-delete"></i
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-user
      ref="setUsers"
      :dialogUserVisible="isShowAddUser"
      @onCancel="isShowAddUser = false"
    ></add-user>
  </div>
</template>

<script>
import addUser from "./components/add-user";
export default {
  components: {
    addUser
  },
  data() {
    return {
      isShowAddUser: false,
      list: null,
      listLoading: true
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      // getList().then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
      this.list = [
        {
          title: "root",
          status: true,
          author: "admin",
          createTime: new Date()
        },
        {
          title: "root1",
          status: false,
          author: "admin",
          createTime: new Date()
        },
        {
          title: "root2",
          status: false,
          author: "admin",
          createTime: new Date()
        },
        {
          title: "root3",
          status: false,
          author: "admin",
          createTime: new Date()
        }
      ];
      this.listLoading = false;
    }
  }
};
</script>
