class RemoveUserId < ActiveRecord::Migration[5.2]
  def change
    remove_column :playlists, :user_id
    remove_column :songs, :user_id
  end
end
