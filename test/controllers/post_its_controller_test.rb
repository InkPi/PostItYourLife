require 'test_helper'

class PostItsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @post_it = post_its(:one)
  end

  test "should get index" do
    get post_its_url, as: :json
    assert_response :success
  end

  test "should create post_it" do
    assert_difference('PostIt.count') do
      post post_its_url, params: { post_it: { content: @post_it.content, title: @post_it.title } }, as: :json
    end

    assert_response 201
  end

  test "should show post_it" do
    get post_it_url(@post_it), as: :json
    assert_response :success
  end

  test "should update post_it" do
    patch post_it_url(@post_it), params: { post_it: { content: @post_it.content, title: @post_it.title } }, as: :json
    assert_response 200
  end

  test "should destroy post_it" do
    assert_difference('PostIt.count', -1) do
      delete post_it_url(@post_it), as: :json
    end

    assert_response 204
  end
end
