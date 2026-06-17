require "test_helper"

class Api::TuroClicksControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_turo_clicks_create_url
    assert_response :success
  end
end
