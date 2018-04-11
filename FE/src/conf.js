let API = {};
// 电影详情+ _ID
API.getMovieDetail = '/api/movies/detail/';
// 后台删除电影
API.deleteMovie = '/api/admin/movie/';
// 新增电影
API.changeMovieDetail = '/api/admin/movie/add';
// 搜索电影详情
API.getMovieList = '/api/movies/search';
API.getCommentDetail = '/api/comment/list';
API.postCommentApi = '/api/comment/add';

// 后台分类
API.getCategoryList = '/api/category/list';
API.changeCategory = '/api/category/change';
API.categoryInfo = '/api/category/info';
// 后台用户列表
API.geUserList = '/api/admin/user/list';
API.deleteUser = '/api/admin/user/';
API.detailUser = '/api/admin/user/';
API.changeUserDetail = '/api/admin/user/change';



module.exports = API;